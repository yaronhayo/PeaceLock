import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MailService } from '@sendgrid/mail';

// Initialize SendGrid with inline logic
const isDevelopment = process.env.NODE_ENV === 'development';
const mailService = new MailService();

if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

// HTML escape utility
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Send email function
async function sendEmail(params: {
  to: string;
  from: string | { email: string; name: string };
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  console.log('SendEmail called with:', {
    to: params.to,
    from: params.from,
    subject: params.subject,
    hasApiKey: !!process.env.SENDGRID_API_KEY,
    nodeEnv: process.env.NODE_ENV
  });

  if (isDevelopment && !process.env.SENDGRID_API_KEY) {
    console.log('Development mode: Email would be sent to:', params.to);
    console.log('Subject:', params.subject);
    return true;
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY not found in environment variables');
    return false;
  }

  try {
    console.log('Attempting to send email via SendGrid...');
    console.log('Email payload:', {
      to: params.to,
      from: params.from,
      subject: params.subject,
      hasHtml: !!params.html,
      replyTo: params.replyTo
    });

    // Add explicit timeout to catch hanging calls
    const sendPromise = mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo
    });

    // Race between send and timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('SendGrid API call timeout after 8 seconds')), 8000);
    });

    const result = await Promise.race([sendPromise, timeoutPromise]);

    console.log('✅ SendGrid SUCCESS:', {
      statusCode: result[0]?.statusCode,
      messageId: result[0]?.headers?.['x-message-id'],
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error: any) {
    console.error('❌ SendGrid ERROR:', {
      message: error.message,
      code: error.code,
      statusCode: error.code,
      responseBody: error.response?.body,
      responseHeaders: error.response?.headers,
      stack: error.stack?.split('\n').slice(0, 3).join('\n')
    });
    return false;
  }
}

// Customer email template
function getCustomerTemplate(data: { customerName: string; serviceType: string; urgency: string; phone: string; address: string; description?: string; }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Service Request Confirmation</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="margin: 0; font-size: 28px;">Peace & Lock</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Professional Garage Door Services</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #f97316; margin-top: 0;">Thank you, ${escapeHtml(data.customerName)}!</h2>
      <p>We've received your service request for ${escapeHtml(data.serviceType.toLowerCase())} service.</p>
      <div style="background: #f8f9fa; border-left: 4px solid #f97316; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Your Service Request Details</h3>
        <p><strong>Service Type:</strong> ${escapeHtml(data.serviceType)}</p>
        <p><strong>Urgency:</strong> ${escapeHtml(data.urgency)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Address:</strong> ${escapeHtml(data.address)}</p>
        ${data.description ? `<p><strong>Description:</strong> ${escapeHtml(data.description)}</p>` : ''}
      </div>
      <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 6px; padding: 20px; margin: 25px 0;">
        <h3 style="color: #10b981; margin-top: 0;">What Happens Next?</h3>
        <ul>
          <li>Our team will review your request promptly</li>
          <li>We'll call you to schedule a convenient time</li>
          <li>Our licensed technician will provide professional service</li>
        </ul>
      </div>
      <div style="background: #f0f9ff; padding: 20px; text-align: center; border-radius: 6px;">
        <h3 style="margin-top: 0;">Need to reach us?</h3>
        <p style="font-size: 24px; font-weight: bold; color: #f97316; margin: 10px 0;">(201) 431-3480</p>
        <p style="margin: 0;">Available 24/7 for emergency services</p>
      </div>
    </div>
    <div style="background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
      <p><strong>Peace & Lock</strong> | NJ License #13VH13566900</p>
    </div>
  </div>
</body>
</html>`;
}

// Team notification template
function getTeamTemplate(data: { customerName: string; email: string; phone: string; serviceType: string; urgency: string; address: string; description?: string; }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>New Service Request</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <div style="background: #fef2f2; color: #dc2626; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-bottom: 15px; display: inline-block;">
        NEW SERVICE REQUEST
      </div>
      <h2 style="margin: 0;">Peace & Lock Team Alert</h2>
    </div>
    <div style="padding: 25px;">
      <div style="background: #fee2e2; color: #dc2626; padding: 15px; border-radius: 6px; text-align: center; margin-bottom: 20px; font-weight: 600; border: 2px solid #fca5a5;">
        ${escapeHtml(data.urgency.toUpperCase())} PRIORITY REQUEST
      </div>
      <div style="background: #f8f9fa; border-left: 4px solid #f97316; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Customer Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(data.customerName)}</p>
        <p><strong>Phone:</strong> <strong>${escapeHtml(data.phone)}</strong></p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Service:</strong> <strong>${escapeHtml(data.serviceType)}</strong></p>
        <p><strong>Address:</strong> ${escapeHtml(data.address)}</p>
        ${data.description ? `<p><strong>Description:</strong> ${escapeHtml(data.description)}</p>` : ''}
      </div>
      <div style="text-align: center; margin: 25px 0;">
        <a href="tel:${escapeHtml(data.phone)}" style="display: inline-block; padding: 12px 24px; margin: 5px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Call Customer</a>
        <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; padding: 12px 24px; margin: 5px; background: #6b7280; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Email Customer</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Working API handler starting...');

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request received');
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    console.log('POST request received');
    try {
      console.log('Working API received:', req.body);

      // Basic validation
      const { firstName, lastName, phone, serviceType } = req.body;

      if (!firstName || !lastName || !phone || !serviceType) {
        console.log('Validation failed');
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: firstName, lastName, phone, serviceType'
        });
      }

      // Create booking
      const booking = {
        id: `booking-${Date.now()}`,
        firstName,
        lastName,
        phone,
        serviceType,
        submittedAt: new Date().toISOString()
      };

      console.log('Working booking created:', booking);

      // Prepare email data
      const emailData = {
        customerName: `${firstName} ${lastName}`,
        email: req.body.email || 'noreply@peaceandlockgarage.com',
        phone,
        serviceType,
        urgency: req.body.urgency || 'normal',
        address: req.body.address || 'TBD',
        description: req.body.description || 'No description provided'
      };

      // Send emails
      console.log('Starting email sending...');
      const emailPromises = [];

      // Customer confirmation
      if (req.body.email && req.body.email.trim()) {
        console.log('Sending customer email to:', req.body.email);
        emailPromises.push(
          sendEmail({
            to: req.body.email,
            from: 'noreply@em2836.peaceandlocknj.com', // Simplified sender format
            subject: 'Service Request Confirmation - Peace & Lock',
            html: getCustomerTemplate(emailData)
          })
        );
      }

      // Team notification
      console.log('Sending team notification');
      emailPromises.push(
        sendEmail({
          to: 'gettmarketing101@gmail.com',
          from: 'noreply@em2836.peaceandlocknj.com', // Simplified sender format
          replyTo: req.body.email && req.body.email.trim() ? req.body.email : 'noreply@em2836.peaceandlocknj.com',
          subject: `NEW ${(req.body.urgency || 'NORMAL').toUpperCase()} PRIORITY REQUEST - ${serviceType}`,
          html: getTeamTemplate(emailData)
        })
      );

      // Process emails with timeout
      console.log(`Processing ${emailPromises.length} email promises...`);

      const emailTimeout = setTimeout(() => {
        console.warn('⚠️  Email sending taking longer than 10 seconds...');
      }, 10000);

      Promise.allSettled(emailPromises).then(results => {
        clearTimeout(emailTimeout);
        console.log('📧 Email processing complete:', {
          total: results.length,
          fulfilled: results.filter(r => r.status === 'fulfilled').length,
          rejected: results.filter(r => r.status === 'rejected').length
        });

        results.forEach((result, index) => {
          const emailType = index === 0 && req.body.email ? 'Customer' : 'Team';
          if (result.status === 'fulfilled') {
            console.log(`✅ ${emailType} email sent successfully`);
          } else {
            console.error(`❌ ${emailType} email failed:`, result.reason?.message || result.reason);
          }
        });
      }).catch(err => {
        clearTimeout(emailTimeout);
        console.error('💥 Email promise error:', err);
      });

      res.status(200).json({
        success: true,
        message: "Booking submitted successfully! You should receive a confirmation email shortly.",
        bookingId: booking.id
      });

    } catch (error) {
      console.error('Working API error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown server error'
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}