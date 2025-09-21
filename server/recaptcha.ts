// Server-side reCAPTCHA verification
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA secret key not configured');
    return true; // Allow in development
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success && data.score > 0.5; // Adjust score threshold as needed
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}