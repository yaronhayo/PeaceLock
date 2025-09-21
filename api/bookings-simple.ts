import type { VercelRequest, VercelResponse } from '@vercel/node';

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

      res.status(200).json({
        success: true,
        message: "Booking submitted successfully (simplified)!",
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