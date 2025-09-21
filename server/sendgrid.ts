import { MailService } from '@sendgrid/mail';

const isDevelopment = process.env.NODE_ENV === 'development';

if (!process.env.SENDGRID_API_KEY && !isDevelopment) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

// HTML escape utility to prevent injection
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

// Whitelist mappers for safe CSS class and subject composition
const urgencyMap: { [key: string]: string } = {
  'low': 'low',
  'medium': 'medium', 
  'high': 'high'
};

const serviceTypeMap: { [key: string]: string } = {
  'Garage Door Repair': 'Repair',
  'Garage Door Installation': 'Installation', 
  'Spring Replacement': 'Spring Replacement',
  'Opener Repair': 'Opener Repair',
  'Emergency Service': 'Emergency Service'
};

function getSafeUrgency(urgency: string): string {
  return urgencyMap[urgency.toLowerCase()] || 'medium';
}

function getSafeServiceType(serviceType: string): string {
  return serviceTypeMap[serviceType] || 'Service Request';
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (isDevelopment && !process.env.SENDGRID_API_KEY) {
    console.log('Development mode: Email would be sent to:', params.to);
    console.log('Subject:', params.subject);
    console.log('NOTE: To test real email sending in development, set SENDGRID_API_KEY environment variable');
    return true;
  }

  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    };

    if (params.replyTo) {
      emailData.replyTo = params.replyTo;
    }

    await mailService.send(emailData);
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', {
      message: error.message,
      code: error.code,
      response: error.response?.body
    });
    return false;
  }
}

// Customer autoresponder template
export function getCustomerConfirmationTemplate(booking: {
  customerName: string;
  serviceType: string;
  urgency: string;
  phone: string;
  address: string;
  description?: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Request Confirmation - Peace & Lock</title>
    <style>
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .tagline {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .greeting {
            font-size: 18px;
            color: #f97316;
            margin-bottom: 20px;
        }
        .details-box {
            background-color: #f8f9fa;
            border-left: 4px solid #f97316;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .detail-row {
            margin-bottom: 12px;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
            display: inline-block;
            width: 120px;
        }
        .detail-value {
            color: #6b7280;
        }
        .next-steps {
            background-color: #ecfdf5;
            border: 1px solid #10b981;
            border-radius: 6px;
            padding: 20px;
            margin: 25px 0;
        }
        .next-steps h3 {
            color: #10b981;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .contact-info {
            background-color: #f0f9ff;
            border-radius: 6px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
        }
        .phone-number {
            font-size: 24px;
            font-weight: bold;
            color: #f97316;
            margin-bottom: 10px;
        }
        .footer {
            background-color: #374151;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #f97316;
            text-decoration: none;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #f97316;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Peace & Lock</div>
            <div class="tagline">Professional Garage Door Services in New Jersey</div>
        </div>
        
        <div class="content">
            <div class="greeting">Thank you, ${escapeHtml(booking.customerName)}!</div>
            
            <p>We've received your service request and our team will contact you as soon as possible to schedule your ${escapeHtml(booking.serviceType.toLowerCase())} service.</p>
            
            <div class="details-box">
                <h3 style="margin-top: 0; color: #374151;">Your Service Request Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Service Type:</span>
                    <span class="detail-value">${escapeHtml(booking.serviceType)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Urgency:</span>
                    <span class="detail-value">${escapeHtml(booking.urgency)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">${escapeHtml(booking.phone)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Address:</span>
                    <span class="detail-value">${escapeHtml(booking.address)}</span>
                </div>
                ${booking.description ? `
                <div class="detail-row">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${escapeHtml(booking.description)}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="next-steps">
                <h3>What Happens Next?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Our team will review your request as soon as possible</li>
                    <li>We'll call you to discuss your needs and schedule a convenient time</li>
                    <li>Our licensed technician will arrive with all necessary tools and parts</li>
                    <li>We'll provide a detailed assessment and transparent service</li>
                </ul>
            </div>
            
            <div class="contact-info">
                <h3 style="margin-top: 0; color: #374151;">Need to reach us?</h3>
                <div class="phone-number">(201) 431-3480</div>
                <p style="margin: 0;">Available 24/7 for emergency services</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Peace & Lock</strong> | NJ License #13VH13566900</p>
            <p>Professional Garage Door Repair & Installation Services Throughout New Jersey</p>
            <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
                This is an automated confirmation email. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

// Team lead notification template
export function getLeadNotificationTemplate(booking: {
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  urgency: string;
  address: string;
  description?: string;
  submittedAt: Date;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Service Request - Peace & Lock</title>
    <style>
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 20px;
            text-align: center;
        }
        .alert-badge {
            background-color: #fef2f2;
            color: #dc2626;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 15px;
            display: inline-block;
        }
        .urgency-high {
            background-color: #fee2e2;
            color: #dc2626;
            border: 2px solid #fca5a5;
        }
        .urgency-medium {
            background-color: #fef3c7;
            color: #d97706;
            border: 2px solid #fcd34d;
        }
        .urgency-low {
            background-color: #ecfdf5;
            color: #059669;
            border: 2px solid #6ee7b7;
        }
        .content {
            padding: 25px 20px;
        }
        .customer-info {
            background-color: #f8f9fa;
            border-left: 4px solid #f97316;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .detail-row {
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
            min-width: 120px;
            flex-shrink: 0;
        }
        .detail-value {
            color: #6b7280;
            flex: 1;
        }
        .action-buttons {
            text-align: center;
            margin: 25px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 5px 10px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
        }
        .btn-primary {
            background-color: #f97316;
            color: white;
        }
        .btn-secondary {
            background-color: #6b7280;
            color: white;
        }
        .timestamp {
            background-color: #f0f9ff;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
            font-size: 14px;
            color: #374151;
        }
        .footer {
            background-color: #374151;
            color: white;
            padding: 15px 20px;
            text-align: center;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="alert-badge">NEW SERVICE REQUEST</div>
            <h2 style="margin: 0;">Peace & Lock Team Alert</h2>
        </div>
        
        <div class="content">
            <div class="urgency-${getSafeUrgency(booking.urgency)}" style="padding: 15px; border-radius: 6px; text-align: center; margin-bottom: 20px; font-weight: 600;">
                ${escapeHtml(booking.urgency.toUpperCase())} PRIORITY REQUEST
            </div>
            
            <div class="customer-info">
                <h3 style="margin-top: 0; color: #374151;">Customer Information</h3>
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value"><strong>${escapeHtml(booking.customerName)}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value"><strong>${escapeHtml(booking.phone)}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${escapeHtml(booking.email)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Service Type:</span>
                    <span class="detail-value"><strong>${escapeHtml(booking.serviceType)}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Address:</span>
                    <span class="detail-value">${escapeHtml(booking.address)}</span>
                </div>
                ${booking.description ? `
                <div class="detail-row">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${escapeHtml(booking.description)}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="action-buttons">
                <a href="tel:${escapeHtml(booking.phone)}" class="btn btn-primary">Call Customer</a>
                <a href="mailto:${escapeHtml(booking.email)}" class="btn btn-secondary">Email Customer</a>
            </div>
            
            <div class="timestamp">
                <strong>Request Submitted:</strong> ${booking.submittedAt.toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Peace & Lock Internal System</strong> | Respond as soon as possible</p>
        </div>
    </div>
</body>
</html>
  `;
}