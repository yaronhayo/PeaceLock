import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Debug API handler starting...');

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
      console.log('Debug API received:', req.body);

      // Basic validation
      const { firstName, lastName, phone, serviceType } = req.body;

      if (!firstName || !lastName || !phone || !serviceType) {
        console.log('Validation failed - missing required fields');
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

      console.log('Debug booking created:', booking);

      // Mock email sending for debugging
      console.log('Mock: Would send confirmation email to:', req.body.email);
      console.log('Mock: Would send team notification to: peaceandlockgarage@gmail.com');

      res.status(200).json({
        success: true,
        message: "Debug booking submitted successfully!",
        bookingId: booking.id,
        environment: process.env.NODE_ENV,
        hasApiKey: !!process.env.SENDGRID_API_KEY
      });

    } catch (error) {
      console.error('Debug API error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown server error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}