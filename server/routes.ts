import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { sendEmail, getCustomerConfirmationTemplate, getLeadNotificationTemplate } from "./sendgrid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Booking submission endpoint
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate the request body against our schema
      const bookingData = insertBookingSchema.parse(req.body);
      
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
      Promise.allSettled([
        sendEmail({
          to: booking.email,
          from: 'noreply@peaceandlock.com', // Using verified domain
          subject: 'Service Request Confirmation - Peace & Lock',
          html: getCustomerConfirmationTemplate(emailData)
        }),
        sendEmail({
          to: 'gettmarketing101@gmail.com',
          from: 'team@peaceandlock.com', // Using verified domain
          replyTo: booking.email, // Allow team to reply directly to customer
          subject: `NEW ${booking.urgency.toUpperCase()} PRIORITY REQUEST - ${booking.serviceType}`,
          html: getLeadNotificationTemplate(emailData)
        })
      ]).then(results => {
        const [customerResult, teamResult] = results;
        
        if (customerResult.status === 'rejected') {
          console.error('Failed to send customer confirmation email:', customerResult.reason);
        } else if (!customerResult.value) {
          console.error('Customer confirmation email failed to send');
        } else {
          console.log('Customer confirmation email sent successfully');
        }
        
        if (teamResult.status === 'rejected') {
          console.error('Failed to send team notification email:', teamResult.reason);
        } else if (!teamResult.value) {
          console.error('Team notification email failed to send');
        } else {
          console.log('Team notification email sent successfully');
        }
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
  });

  // Get all bookings (for admin purposes)
  app.get("/api/bookings", async (req, res) => {
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
  });

  const httpServer = createServer(app);
  return httpServer;
}
