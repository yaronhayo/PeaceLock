import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MailService } from '@sendgrid/mail';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('SendGrid test starting...');
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Has SendGrid API key:', !!process.env.SENDGRID_API_KEY);

      if (!process.env.SENDGRID_API_KEY) {
        return res.status(400).json({
          success: false,
          error: 'SENDGRID_API_KEY not found in environment variables'
        });
      }

      const mailService = new MailService();
      mailService.setApiKey(process.env.SENDGRID_API_KEY);

      console.log('Attempting to send test email...');

      const testEmail = {
        to: 'gettmarketing101@gmail.com',
        from: {
          email: 'noreply@em6046.peaceandlocknj.com',
          name: 'Peace & Lock Test'
        },
        subject: 'SendGrid Test Email',
        html: '<h1>Test Email</h1><p>This is a test email to verify SendGrid is working.</p>'
      };

      const result = await mailService.send(testEmail);

      console.log('SendGrid test result:', result);

      res.status(200).json({
        success: true,
        message: 'Test email sent successfully',
        sendgridResponse: result
      });

    } catch (error: any) {
      console.error('SendGrid test error:', {
        message: error.message,
        code: error.code,
        response: error.response?.body,
        stack: error.stack
      });

      res.status(500).json({
        success: false,
        error: error.message,
        code: error.code,
        response: error.response?.body
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}