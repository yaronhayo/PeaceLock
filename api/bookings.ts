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
  <meta name="x-apple-disable-message-reformatting">
  <title>Service Request Confirmation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    /* Reset styles */
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    table { border-collapse: collapse; }

    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px !important; }
      .header { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #1a1a1a; line-height: 1.6;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Peace & Lock</h1>
              <p style="margin: 12px 0 0 0; font-size: 18px; color: rgba(255,255,255,0.9); font-weight: 500;">Professional Garage Door Services</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content" style="padding: 40px 30px; background-color: #ffffff;">

              <!-- Success Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <div style="background-color: #16a34a; color: #ffffff; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                      ✓ Request Confirmed
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Welcome Message -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <h2 style="margin: 0 0 12px 0; font-size: 28px; font-weight: 700; color: #1a1a1a;">Thank you, ${escapeHtml(data.customerName)}!</h2>
                    <p style="margin: 0; font-size: 16px; color: #666666; line-height: 1.5;">We've received your service request and our professional team will contact you shortly.</p>
                  </td>
                </tr>
              </table>

              <!-- Service Details -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; border: 2px solid #e9ecef; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">Service Request Details</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666; width: 40%;">Service Type:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${escapeHtml(data.serviceType)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Urgency Level:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${escapeHtml(data.urgency.charAt(0).toUpperCase() + data.urgency.slice(1))}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Phone:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${escapeHtml(data.phone)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Address:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${escapeHtml(data.address)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Submitted:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${data.submittedAt}</td>
                      </tr>
                      ${data.description ? `<tr><td style="padding: 8px 0; font-weight: 500; color: #666666; vertical-align: top;">Description:</td><td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${escapeHtml(data.description)}</td></tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0fdf4; border-radius: 8px; border: 2px solid #16a34a; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #16a34a;">What Happens Next?</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top; width: 24px;">
                          <span style="color: #16a34a; font-size: 16px; font-weight: 700;">✓</span>
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #1a1a1a; font-weight: 500;">
                          Our team will review your request within 30 minutes
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top; width: 24px;">
                          <span style="color: #16a34a; font-size: 16px; font-weight: 700;">✓</span>
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #1a1a1a; font-weight: 500;">
                          We'll call you to schedule a convenient appointment time
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top; width: 24px;">
                          <span style="color: #16a34a; font-size: 16px; font-weight: 700;">✓</span>
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #1a1a1a; font-weight: 500;">
                          Our licensed technician will provide professional service
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Contact Information -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px; border: 3px solid #d97706; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #d97706;">Need Immediate Assistance?</h3>
                    <div style="background-color: #d97706; color: #ffffff; padding: 20px; border-radius: 8px; margin: 0 auto; max-width: 300px;">
                      <p style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">(201) 431-3480</p>
                    </div>
                    <p style="margin: 16px 0 0 0; color: #666666; font-weight: 500; font-size: 16px;">Available 24/7 for emergency services</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; color: #e5e5e5; padding: 30px; text-align: center;">
              <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #ffffff;">Peace & Lock</h4>
              <p style="margin: 0 0 4px 0; font-size: 14px; opacity: 0.8;">NJ License #13VH13566900</p>
              <p style="margin: 0; font-size: 14px; opacity: 0.8;">Professional • Licensed • Insured</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Team notification template
function getTeamTemplate(data: { customerName: string; email: string; phone: string; serviceType: string; urgency: string; address: string; description?: string; submittedAt: string; userAgent?: string; ipAddress?: string; referrer?: string; }) {
  const urgencyConfig = {
    emergency: { color: '#dc2626', bgColor: '#fef2f2', borderColor: '#dc2626', label: 'EMERGENCY' },
    urgent: { color: '#d97706', bgColor: '#fffbeb', borderColor: '#d97706', label: 'URGENT' },
    normal: { color: '#16a34a', bgColor: '#f0fdf4', borderColor: '#16a34a', label: 'NORMAL' }
  };
  const config = urgencyConfig[data.urgency as keyof typeof urgencyConfig] || urgencyConfig.normal;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>New Service Request - Team Alert</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    /* Reset styles */
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    table { border-collapse: collapse; }

    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px !important; }
      .header { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #1a1a1a; line-height: 1.6;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="700" class="container" style="max-width: 700px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 40px 30px; text-align: center;">
              <div style="background-color: rgba(255,255,255,0.15); color: #ffffff; padding: 12px 24px; border-radius: 6px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-bottom: 16px;">
                🚨 NEW SERVICE REQUEST
              </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Peace & Lock Team Alert</h1>
              <p style="margin: 12px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.9); font-weight: 500;">Immediate action required</p>
            </td>
          </tr>

          <!-- Priority Banner -->
          <tr>
            <td style="background-color: ${config.bgColor}; color: ${config.color}; padding: 20px; text-align: center; font-weight: 700; font-size: 18px; border-top: 4px solid ${config.borderColor}; border-bottom: 4px solid ${config.borderColor};">
              🚨 ${config.label} PRIORITY REQUEST 🚨
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content" style="padding: 40px 30px; background-color: #ffffff;">

              <!-- Customer Information -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; border: 2px solid #e9ecef; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">Customer Information</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666; width: 25%;">Name:</td>
                        <td style="padding: 8px 0; font-weight: 700; color: #1a1a1a; font-size: 16px;">${escapeHtml(data.customerName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Phone:</td>
                        <td style="padding: 8px 0;">
                          <a href="tel:${escapeHtml(data.phone)}" style="color: #dc2626; text-decoration: none; font-weight: 700; font-size: 18px;">${escapeHtml(data.phone)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${escapeHtml(data.email)}" style="color: #1e40af; text-decoration: none; font-weight: 600;">${escapeHtml(data.email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Service:</td>
                        <td style="padding: 8px 0; font-weight: 700; color: #1a1a1a; font-size: 16px;">${escapeHtml(data.serviceType)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Address:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${escapeHtml(data.address)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 500; color: #666666;">Submitted:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${data.submittedAt}</td>
                      </tr>
                      ${data.description ? `<tr><td style="padding: 12px 0 8px 0; font-weight: 500; color: #666666; vertical-align: top;">Description:</td><td style="padding: 12px 0 8px 0;"><div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 12px; color: #1a1a1a; font-weight: 500;">${escapeHtml(data.description)}</div></td></tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td align="center" style="padding: 30px; background-color: #f8f9fa; border-radius: 8px; border: 2px solid #16a34a;">
                    <h3 style="margin: 0 0 20px 0; color: #16a34a; font-size: 20px; font-weight: 600;">Quick Actions</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="tel:${escapeHtml(data.phone)}" style="display: inline-block; padding: 16px 32px; background-color: #dc2626; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 16px;">📞 Call Customer</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; padding: 16px 32px; background-color: #1e40af; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 16px;">✉️ Email Customer</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Session Information -->
              ${data.userAgent || data.ipAddress || data.referrer ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="margin: 0 0 16px 0; color: #666666; font-size: 16px; font-weight: 600;">🌐 Session Information</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;">
                      ${data.ipAddress ? `<tr><td style="padding: 6px 0; color: #666666; font-weight: 500; width: 25%;">IP Address:</td><td style="padding: 6px 0; color: #1a1a1a; font-family: 'Courier New', monospace;">${escapeHtml(data.ipAddress)}</td></tr>` : ''}
                      ${data.userAgent ? `<tr><td style="padding: 6px 0; color: #666666; font-weight: 500; vertical-align: top;">User Agent:</td><td style="padding: 6px 0; color: #1a1a1a; font-family: 'Courier New', monospace; word-break: break-all; font-size: 12px;">${escapeHtml(data.userAgent)}</td></tr>` : ''}
                      ${data.referrer ? `<tr><td style="padding: 6px 0; color: #666666; font-weight: 500;">Referrer:</td><td style="padding: 6px 0; color: #1a1a1a; font-family: 'Courier New', monospace; font-size: 12px;">${escapeHtml(data.referrer)}</td></tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>` : ''}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; color: #e5e5e5; padding: 30px; text-align: center;">
              <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #ffffff;">Peace & Lock Team Dashboard</h4>
              <p style="margin: 0; font-size: 14px; opacity: 0.8;">This is an automated notification • Respond promptly</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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

      // Team notifications to multiple recipients
      console.log('Sending team notifications');
      const teamEmails = [
        'gettmarketing101@gmail.com',
        'sandrahmarketing@gmail.com',
        'peaceandlockgarage@gmail.com'
      ];

      for (const recipient of teamEmails) {
        console.log(`Sending team notification to: ${recipient}`);
        const teamResult = await sendEmail({
          to: recipient,
          from: {
            email: 'noreply@em6046.peaceandlocknj.com',
            name: 'Peace & Lock'
          },
          replyTo: req.body.email && req.body.email.trim() ? req.body.email : 'noreply@em6046.peaceandlocknj.com',
          subject: `NEW ${(req.body.urgency || 'NORMAL').toUpperCase()} PRIORITY REQUEST - ${serviceType}`,
          html: getTeamTemplate(emailData)
        });
        console.log(`Team email result for ${recipient}:`, teamResult);
      }

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