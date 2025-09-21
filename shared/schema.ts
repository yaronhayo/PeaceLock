import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Bookings table for service requests
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // Personal Information
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  
  // Service Details
  serviceType: text("service_type").notNull(),
  urgency: text("urgency").notNull().default('normal'),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  
  // Property Information
  address: text("address").notNull(),
  city: text("city").notNull(),
  zipCode: text("zip_code").notNull(),
  propertyType: text("property_type").notNull().default('residential'),
  
  // Issue Description
  description: text("description").notNull(),
  garageDoorBrand: text("garage_door_brand"),
  ageOfDoor: text("age_of_door"),
  
  // Additional Options
  contactMethod: text("contact_method").notNull().default('phone'),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
