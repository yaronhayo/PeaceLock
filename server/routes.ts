import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";

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
