import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertBookingSchema } from '../shared/schema';
import { sendEmail, getCustomerConfirmationTemplate, getLeadNotificationTemplate } from '../server/sendgrid';
import { verifyRecaptcha } from '../server/recaptcha';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Extract reCAPTCHA token from request body
      const { recaptchaToken, ...formData } = req.body;

      // Verify reCAPTCHA token
      if (!recaptchaToken) {
        return res.status(400).json({
          success: false,
          message: 'reCAPTCHA verification required'
        });
      }

      const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isRecaptchaValid) {
        return res.status(400).json({
          success: false,
          message: 'reCAPTCHA verification failed'
        });
      }

      // Validate the request body against our schema
      const bookingData = insertBookingSchema.parse(formData);

      // Create the booking in storage
      const booking = await storage.createBooking(bookingData);

      console.log('New booking received:', {
        id: booking.id,
        name: `${booking.firstName} ${booking.lastName}`,
        phone: booking.phone,
        serviceType: booking.serviceType,
        urgency: booking.urgency
      });

      // Prepare data for email templates
      const emailData = {
        customerName: `${booking.firstName} ${booking.lastName}`,
        email: booking.email,
        phone: booking.phone,
        serviceType: booking.serviceType,
        urgency: booking.urgency,
        address: booking.address,
        description: booking.description || undefined,
        submittedAt: new Date()
      };

      // Send emails asynchronously (don't block the response)
      const emailPromises = [];

      // Only send customer confirmation if email is provided
      if (booking.email && booking.email.trim() !== '') {
        emailPromises.push(
          sendEmail({
            to: booking.email,
            from: 'noreply@peaceandlockgarage.com',
            subject: 'Service Request Confirmation - Peace & Lock',
            html: getCustomerConfirmationTemplate(emailData)
          })
        );
      }

      // Always send team notification
      emailPromises.push(
        sendEmail({
          to: 'peaceandlockgarage@gmail.com',
          from: 'team@peaceandlockgarage.com',
          replyTo: booking.email && booking.email.trim() !== '' ? booking.email : 'noreply@peaceandlockgarage.com',
          subject: `NEW ${booking.urgency.toUpperCase()} PRIORITY REQUEST - ${booking.serviceType}`,
          html: getLeadNotificationTemplate(emailData)
        })
      );

      Promise.allSettled(emailPromises).then(results => {
        let customerSent = false;
        let teamSent = false;

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            if (booking.email && booking.email.trim() !== '' && index === 0) {
              console.log('Customer confirmation email sent successfully');
              customerSent = true;
            } else if ((booking.email && booking.email.trim() !== '' && index === 1) || (!booking.email && index === 0)) {
              console.log('Team notification email sent successfully');
              teamSent = true;
            }
          } else {
            if (booking.email && booking.email.trim() !== '' && index === 0) {
              console.error('Failed to send customer confirmation email:', result.reason);
            } else {
              console.error('Failed to send team notification email:', result.reason);
            }
          }
        });
      });

      res.status(201).json({
        success: true,
        message: "Booking submitted successfully!",
        bookingId: booking.id
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      res.status(400).json({
        success: false,
        message: "Invalid booking data. Please check your inputs and try again."
      });
    }
  } else if (req.method === 'GET') {
    try {
      const bookings = await storage.getAllBookings();
      res.json({ success: true, bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch bookings"
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}