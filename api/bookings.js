"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// api/bookings.ts
var bookings_exports = {};
__export(bookings_exports, {
  default: () => handler
});
module.exports = __toCommonJS(bookings_exports);

// server/storage.ts
var import_crypto = require("crypto");
var MemStorage = class {
  users;
  bookings;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = (0, import_crypto.randomUUID)();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createBooking(insertBooking) {
    const id = (0, import_crypto.randomUUID)();
    const booking = {
      ...insertBooking,
      urgency: insertBooking.urgency || "normal",
      propertyType: insertBooking.propertyType || "residential",
      contactMethod: insertBooking.contactMethod || "phone",
      marketingConsent: insertBooking.marketingConsent || false,
      preferredDate: insertBooking.preferredDate || null,
      preferredTime: insertBooking.preferredTime || null,
      garageDoorBrand: insertBooking.garageDoorBrand || null,
      ageOfDoor: insertBooking.ageOfDoor || null,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async getAllBookings() {
    return Array.from(this.bookings.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
var import_drizzle_orm = require("drizzle-orm");
var import_pg_core = require("drizzle-orm/pg-core");
var import_drizzle_zod = require("drizzle-zod");
var users = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  username: (0, import_pg_core.text)("username").notNull().unique(),
  password: (0, import_pg_core.text)("password").notNull()
});
var insertUserSchema = (0, import_drizzle_zod.createInsertSchema)(users).pick({
  username: true,
  password: true
});
var bookings = (0, import_pg_core.pgTable)("bookings", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  // Personal Information
  firstName: (0, import_pg_core.text)("first_name").notNull(),
  lastName: (0, import_pg_core.text)("last_name").notNull(),
  phone: (0, import_pg_core.text)("phone").notNull(),
  email: (0, import_pg_core.text)("email").notNull(),
  // Service Details
  serviceType: (0, import_pg_core.text)("service_type").notNull(),
  urgency: (0, import_pg_core.text)("urgency").notNull().default("normal"),
  preferredDate: (0, import_pg_core.text)("preferred_date"),
  preferredTime: (0, import_pg_core.text)("preferred_time"),
  // Property Information
  address: (0, import_pg_core.text)("address").notNull(),
  city: (0, import_pg_core.text)("city").notNull(),
  zipCode: (0, import_pg_core.text)("zip_code").notNull(),
  propertyType: (0, import_pg_core.text)("property_type").notNull().default("residential"),
  // Issue Description
  description: (0, import_pg_core.text)("description").notNull(),
  garageDoorBrand: (0, import_pg_core.text)("garage_door_brand"),
  ageOfDoor: (0, import_pg_core.text)("age_of_door"),
  // Additional Options
  contactMethod: (0, import_pg_core.text)("contact_method").notNull().default("phone"),
  marketingConsent: (0, import_pg_core.boolean)("marketing_consent").notNull().default(false),
  // Timestamps
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var insertBookingSchema = (0, import_drizzle_zod.createInsertSchema)(bookings).omit({
  id: true,
  createdAt: true
});

// server/sendgrid.ts
var import_mail = require("@sendgrid/mail");
var isDevelopment = process.env.NODE_ENV === "development";
if (!process.env.SENDGRID_API_KEY && !isDevelopment) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}
var mailService = new import_mail.MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}
function escapeHtml(text2) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text2.replace(/[&<>"']/g, (m) => map[m]);
}
var urgencyMap = {
  "low": "low",
  "medium": "medium",
  "high": "high"
};
function getSafeUrgency(urgency) {
  return urgencyMap[urgency.toLowerCase()] || "medium";
}
async function sendEmail(params) {
  if (isDevelopment && !process.env.SENDGRID_API_KEY) {
    console.log("Development mode: Email would be sent to:", params.to);
    console.log("Subject:", params.subject);
    return true;
  }
  try {
    const emailData = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html
    };
    if (params.replyTo) {
      emailData.replyTo = params.replyTo;
    }
    await mailService.send(emailData);
    return true;
  } catch (error) {
    console.error("SendGrid email error:", {
      message: error.message,
      code: error.code,
      response: error.response?.body
    });
    return false;
  }
}
function getCustomerConfirmationTemplate(booking) {
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
                ` : ""}
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
function getLeadNotificationTemplate(booking) {
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
                ` : ""}
            </div>
            
            <div class="action-buttons">
                <a href="tel:${escapeHtml(booking.phone)}" class="btn btn-primary">Call Customer</a>
                <a href="mailto:${escapeHtml(booking.email)}" class="btn btn-secondary">Email Customer</a>
            </div>
            
            <div class="timestamp">
                <strong>Request Submitted:</strong> ${booking.submittedAt.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
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

// api/bookings.ts
async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method === "POST") {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      console.log("New booking received:", {
        id: booking.id,
        name: `${booking.firstName} ${booking.lastName}`,
        phone: booking.phone,
        serviceType: booking.serviceType,
        urgency: booking.urgency
      });
      const emailData = {
        customerName: `${booking.firstName} ${booking.lastName}`,
        email: booking.email,
        phone: booking.phone,
        serviceType: booking.serviceType,
        urgency: booking.urgency,
        address: booking.address,
        description: booking.description || void 0,
        submittedAt: /* @__PURE__ */ new Date()
      };
      Promise.allSettled([
        sendEmail({
          to: booking.email,
          from: "noreply@peaceandlockgarage.com",
          // Updated email domain
          subject: "Service Request Confirmation - Peace & Lock",
          html: getCustomerConfirmationTemplate(emailData)
        }),
        sendEmail({
          to: "peaceandlockgarage@gmail.com",
          from: "team@peaceandlockgarage.com",
          // Updated email domain
          replyTo: booking.email,
          // Allow team to reply directly to customer
          subject: `NEW ${booking.urgency.toUpperCase()} PRIORITY REQUEST - ${booking.serviceType}`,
          html: getLeadNotificationTemplate(emailData)
        })
      ]).then((results) => {
        const [customerResult, teamResult] = results;
        if (customerResult.status === "rejected") {
          console.error("Failed to send customer confirmation email:", customerResult.reason);
        } else if (!customerResult.value) {
          console.error("Customer confirmation email failed to send");
        } else {
          console.log("Customer confirmation email sent successfully");
        }
        if (teamResult.status === "rejected") {
          console.error("Failed to send team notification email:", teamResult.reason);
        } else if (!teamResult.value) {
          console.error("Team notification email failed to send");
        } else {
          console.log("Team notification email sent successfully");
        }
      });
      res.status(201).json({
        success: true,
        message: "Booking submitted successfully!",
        bookingId: booking.id
      });
    } catch (error) {
      console.error("Booking submission error:", error);
      res.status(400).json({
        success: false,
        message: "Invalid booking data. Please check your inputs and try again."
      });
    }
  } else if (req.method === "GET") {
    try {
      const bookings2 = await storage.getAllBookings();
      res.json({ success: true, bookings: bookings2 });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch bookings"
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
