import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail, getCustomerConfirmationTemplate, getLeadNotificationTemplate } from '../server/sendgrid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('API handler starting...');

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
      console.log('Simple booking API received:', req.body);

      // Basic validation
      const { firstName, lastName, phone, serviceType } = req.body;

      if (!firstName || !lastName || !phone || !serviceType) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: firstName, lastName, phone, serviceType'
        });
      }

      // Create a simple booking object
      const booking = {
        id: `booking-${Date.now()}`,
        firstName,
        lastName,
        phone,
        serviceType,
        submittedAt: new Date().toISOString()
      };

      console.log('Simple booking created:', booking);

      // Prepare data for email templates
      const emailData = {
        customerName: `${firstName} ${lastName}`,
        email: req.body.email || 'noreply@peaceandlockgarage.com', // Use provided email or fallback
        phone: phone,
        serviceType: serviceType,
        urgency: req.body.urgency || 'normal',
        address: req.body.address || 'TBD',
        description: req.body.description || 'No description provided',
        submittedAt: new Date()
      };

      // Send emails asynchronously (don't block the response)
      console.log('Starting email sending process...');
      try {
        const emailPromises = [];

        // Only send customer confirmation if email is provided
        if (req.body.email && req.body.email.trim() !== '') {
          console.log('Preparing customer confirmation email to:', req.body.email);
          emailPromises.push(
            sendEmail({
              to: req.body.email,
              from: 'noreply@peaceandlockgarage.com',
              subject: 'Service Request Confirmation - Peace & Lock',
              html: getCustomerConfirmationTemplate(emailData)
            })
          );
        }

        // Always send team notification
        console.log('Preparing team notification email');
        emailPromises.push(
          sendEmail({
            to: 'peaceandlockgarage@gmail.com',
            from: 'team@peaceandlockgarage.com',
            replyTo: req.body.email && req.body.email.trim() !== '' ? req.body.email : 'noreply@peaceandlockgarage.com',
            subject: `NEW ${(req.body.urgency || 'NORMAL').toUpperCase()} PRIORITY REQUEST - ${serviceType}`,
            html: getLeadNotificationTemplate(emailData)
          })
        );

        Promise.allSettled(emailPromises).then(results => {
          console.log('Email sending results:', results.length, 'promises resolved');
          results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
              if (req.body.email && req.body.email.trim() !== '' && index === 0) {
                console.log('Customer confirmation email sent successfully');
              } else if ((req.body.email && req.body.email.trim() !== '' && index === 1) || (!req.body.email && index === 0)) {
                console.log('Team notification email sent successfully');
              }
            } else {
              if (req.body.email && req.body.email.trim() !== '' && index === 0) {
                console.error('Failed to send customer confirmation email:', result.reason);
              } else {
                console.error('Failed to send team notification email:', result.reason);
              }
            }
          });
        }).catch(promiseError => {
          console.error('Error in email promise handling:', promiseError);
        });
      } catch (emailError) {
        console.error('Error preparing emails:', emailError);
        // Continue with response even if email fails
      }

      res.status(200).json({
        success: true,
        message: "Booking submitted successfully! You should receive a confirmation email shortly.",
        bookingId: booking.id
      });

    } catch (error) {
      console.error('Simple booking API error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown server error'
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}