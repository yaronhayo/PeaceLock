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

    const result = await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo
    });

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
function getCustomerTemplate(data: { customerName: string; serviceType: string; urgency: string; phone: string; address: string; description?: string; submittedAt: string; }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Request Confirmation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
  </style>
</head>
<body style="font-family: 'Space Grotesk', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 20px; background: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); color: white; padding: 40px 30px; text-align: center; position: relative;">
      <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px; font-weight: 700;">🔒</span>
      </div>
      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Peace & Lock</h1>
      <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Professional Garage Door Services</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 40px 30px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="background: #dcfce7; color: #166534; padding: 12px 24px; border-radius: 50px; display: inline-block; font-weight: 600; font-size: 14px; margin-bottom: 20px;">
          ✓ REQUEST CONFIRMED
        </div>
        <h2 style="color: #1f2937; margin: 0; font-size: 24px; font-weight: 600;">Thank you, ${escapeHtml(data.customerName)}!</h2>
        <p style="color: #6b7280; margin: 8px 0 0 0;">We've received your service request and our team is on it.</p>
      </div>

      <!-- Service Details Card -->
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="background: #d97706; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <span style="font-size: 16px; font-weight: 600;">📝</span>
          </div>
          <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #1f2937;">Service Request Details</h3>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Service Type:</td><td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${escapeHtml(data.serviceType)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Urgency Level:</td><td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${escapeHtml(data.urgency.charAt(0).toUpperCase() + data.urgency.slice(1))}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Phone:</td><td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Address:</td><td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${escapeHtml(data.address)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Submitted:</td><td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${data.submittedAt}</td></tr>
          ${data.description ? `<tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Description:</td><td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${escapeHtml(data.description)}</td></tr>` : ''}
        </table>
      </div>

      <!-- Next Steps -->
      <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 1px solid #a7f3d0; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="background: #059669; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <span style="font-size: 16px;">📋</span>
          </div>
          <h3 style="color: #059669; margin: 0; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
        </div>
        <ul style="margin: 0; padding-left: 0; list-style: none;">
          <li style="padding: 8px 0; display: flex; align-items: center;"><span style="color: #059669; margin-right: 12px; font-size: 16px;">✓</span>Our team will review your request within 30 minutes</li>
          <li style="padding: 8px 0; display: flex; align-items: center;"><span style="color: #059669; margin-right: 12px; font-size: 16px;">✓</span>We'll call you to schedule a convenient appointment time</li>
          <li style="padding: 8px 0; display: flex; align-items: center;"><span style="color: #059669; margin-right: 12px; font-size: 16px;">✓</span>Our licensed technician will provide professional service</li>
        </ul>
      </div>

      <!-- Contact Information -->
      <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #93c5fd; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1e40af;">Need to reach us immediately?</h3>
        <div style="background: #1e40af; color: white; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">(201) 431-3480</p>
        </div>
        <p style="margin: 0; color: #1e40af; font-weight: 500;">Available 24/7 for emergency services</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #1f2937; color: #e5e7eb; padding: 24px; text-align: center;">
      <p style="margin: 0; font-weight: 600; font-size: 16px;">Peace & Lock</p>
      <p style="margin: 4px 0 0 0; opacity: 0.8; font-size: 14px;">NJ License #13VH13566900</p>
      <p style="margin: 8px 0 0 0; opacity: 0.8; font-size: 14px;">Professional • Licensed • Insured</p>
    </div>
  </div>
</body>
</html>`;
}

// Team notification template
function getTeamTemplate(data: { customerName: string; email: string; phone: string; serviceType: string; urgency: string; address: string; description?: string; submittedAt: string; userAgent?: string; ipAddress?: string; referrer?: string; }) {
  const urgencyConfig = {
    emergency: { color: '#dc2626', bgColor: '#fee2e2', borderColor: '#fca5a5', icon: '🚨' },
    urgent: { color: '#ea580c', bgColor: '#fed7aa', borderColor: '#fdba74', icon: '⚡' },
    normal: { color: '#059669', bgColor: '#d1fae5', borderColor: '#a7f3d0', icon: '📝' }
  };
  const config = urgencyConfig[data.urgency as keyof typeof urgencyConfig] || urgencyConfig.normal;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Request Alert</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
  </style>
</head>
<body style="font-family: 'Space Grotesk', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 20px; background: #f9fafb;">
  <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
    <!-- Alert Header -->
    <div style="background: linear-gradient(135deg, ${config.color} 0%, #7f1d1d 100%); color: white; padding: 30px; text-align: center; position: relative;">
      <div style="background: rgba(255,255,255,0.1); padding: 12px 24px; border-radius: 50px; font-weight: 700; margin-bottom: 16px; display: inline-block; font-size: 14px; letter-spacing: 0.5px;">
        ${config.icon} NEW SERVICE REQUEST
      </div>
      <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Peace & Lock Team Alert</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">Immediate action required</p>
    </div>

    <!-- Priority Banner -->
    <div style="background: ${config.bgColor}; color: ${config.color}; padding: 20px; text-align: center; font-weight: 700; font-size: 18px; border: 2px solid ${config.borderColor}; margin: 0;">
      ${config.icon} ${escapeHtml(data.urgency.toUpperCase())} PRIORITY REQUEST ${config.icon}
    </div>

    <div style="padding: 40px 30px;">
      <!-- Customer Information Card -->
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 0 0 24px 0;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="background: #d97706; color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
            <span style="font-size: 20px;">👤</span>
          </div>
          <h3 style="margin: 0; font-size: 20px; font-weight: 600; color: #1f2937;">Customer Information</h3>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 500; width: 120px;">Name:</td><td style="padding: 10px 0; color: #1f2937; font-weight: 600; font-size: 16px;">${escapeHtml(data.customerName)}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Phone:</td><td style="padding: 10px 0; color: #1f2937; font-weight: 700; font-size: 18px;"><a href="tel:${escapeHtml(data.phone)}" style="color: #dc2626; text-decoration: none;">${escapeHtml(data.phone)}</a></td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Email:</td><td style="padding: 10px 0; color: #1f2937; font-weight: 600;"><a href="mailto:${escapeHtml(data.email)}" style="color: #1e40af; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Service:</td><td style="padding: 10px 0; color: #1f2937; font-weight: 700; font-size: 16px;">${escapeHtml(data.serviceType)}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Address:</td><td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${escapeHtml(data.address)}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Submitted:</td><td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${data.submittedAt}</td></tr>
          ${data.description ? `<tr><td style="padding: 10px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Description:</td><td style="padding: 10px 0; color: #1f2937; font-weight: 600; background: #f1f5f9; padding: 12px; border-radius: 6px; border-left: 3px solid #3b82f6;">${escapeHtml(data.description)}</td></tr>` : ''}
        </table>
      </div>

      <!-- Action Buttons -->
      <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #93c5fd; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
        <h3 style="margin: 0 0 20px 0; color: #1e40af; font-size: 18px; font-weight: 600;">Quick Actions</h3>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="tel:${escapeHtml(data.phone)}" style="display: inline-block; padding: 14px 28px; background: #dc2626; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">📞 Call Customer</a>
          <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; padding: 14px 28px; background: #1e40af; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2);">✉️ Email Customer</a>
        </div>
      </div>

      <!-- Session Information -->
      ${data.userAgent || data.ipAddress || data.referrer ? `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="margin: 0 0 16px 0; color: #6b7280; font-size: 16px; font-weight: 600;">🌐 Session Information</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${data.ipAddress ? `<tr><td style="padding: 6px 0; color: #6b7280; font-weight: 500;">IP Address:</td><td style="padding: 6px 0; color: #1f2937; font-family: monospace;">${escapeHtml(data.ipAddress)}</td></tr>` : ''}
          ${data.userAgent ? `<tr><td style="padding: 6px 0; color: #6b7280; font-weight: 500; vertical-align: top;">User Agent:</td><td style="padding: 6px 0; color: #1f2937; font-family: monospace; word-break: break-all;">${escapeHtml(data.userAgent)}</td></tr>` : ''}
          ${data.referrer ? `<tr><td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Referrer:</td><td style="padding: 6px 0; color: #1f2937; font-family: monospace;">${escapeHtml(data.referrer)}</td></tr>` : ''}
        </table>
      </div>` : ''}
    </div>

    <!-- Footer -->
    <div style="background: #1f2937; color: #e5e7eb; padding: 20px; text-align: center;">
      <p style="margin: 0; font-weight: 600;">Peace & Lock Team Dashboard</p>
      <p style="margin: 4px 0 0 0; opacity: 0.8; font-size: 14px;">This is an automated notification • Respond promptly</p>
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

      // Get current time in Eastern timezone
      const easternTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      // Extract session information
      const userAgent = req.headers['user-agent'] || 'Unknown';
      const ipAddress = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection?.remoteAddress || 'Unknown';
      const referrer = req.headers.referer || req.headers.referrer || 'Direct';

      // Prepare email data
      const emailData = {
        customerName: `${firstName} ${lastName}`,
        email: req.body.email || 'noreply@peaceandlockgarage.com',
        phone,
        serviceType,
        urgency: req.body.urgency || 'normal',
        address: `${req.body.address || 'TBD'}, ${req.body.city || ''} ${req.body.zipCode || ''}`.trim(),
        description: req.body.description || 'No description provided',
        submittedAt: easternTime,
        userAgent: Array.isArray(userAgent) ? userAgent[0] : userAgent,
        ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
        referrer: Array.isArray(referrer) ? referrer[0] : referrer
      };

      // Send emails sequentially
      console.log('Starting email sending...');

      // Customer confirmation
      if (req.body.email && req.body.email.trim()) {
        console.log('Sending customer email to:', req.body.email);
        const customerResult = await sendEmail({
          to: req.body.email,
          from: {
            email: 'noreply@em6046.peaceandlocknj.com',
            name: 'Peace & Lock'
          },
          subject: 'Service Request Confirmation - Peace & Lock',
          html: getCustomerTemplate(emailData)
        });
        console.log('Customer email result:', customerResult);
      }

      // Team notification
      console.log('Sending team notification');
      const teamResult = await sendEmail({
        to: 'gettmarketing101@gmail.com',
        from: {
          email: 'noreply@em6046.peaceandlocknj.com',
          name: 'Peace & Lock'
        },
        replyTo: req.body.email && req.body.email.trim() ? req.body.email : 'noreply@em6046.peaceandlocknj.com',
        subject: `NEW ${(req.body.urgency || 'NORMAL').toUpperCase()} PRIORITY REQUEST - ${serviceType}`,
        html: getTeamTemplate(emailData)
      });
      console.log('Team email result:', teamResult);

      console.log('📧 Email processing complete');

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