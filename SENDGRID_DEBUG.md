# SendGrid Debugging Instructions

## Step 1: Submit a form on your live site
Submit a test form with your email address.

## Step 2: Check Vercel Function Logs
1. Go to Vercel Dashboard → Your Project → Functions tab
2. Click on the `bookings` function
3. Look for recent invocations
4. Check the logs for:
   - "SendEmail called with:"
   - "Has SendGrid API key:" (should be true)
   - "Attempting to send email via SendGrid..."
   - Any SendGrid errors

## Step 3: Check SendGrid Dashboard
1. Go to SendGrid Dashboard → Activity
2. Look for recent email attempts
3. Check if emails are being rejected, bounced, or suppressed

## Step 4: Verify Domain Authentication
1. Go to SendGrid → Settings → Sender Authentication
2. Confirm em2836.peaceandlocknj.com is properly authenticated
3. Check DNS records are properly configured

## Expected Logs in Vercel:
```
Working API handler starting...
POST request received
Working API received: [form data]
Starting email sending...
SendEmail called with: {
  to: 'user@example.com',
  from: { email: 'noreply@em2836.peaceandlocknj.com', name: 'Peace & Lock' },
  hasApiKey: true,
  nodeEnv: 'production'
}
Attempting to send email via SendGrid...
SendGrid send result: [success response]
```

## If you see errors, common issues are:
- "SENDGRID_API_KEY not found" → Environment variable not set
- "401 Unauthorized" → Invalid API key
- "403 Forbidden" → Domain not authenticated
- "550 Unverified sender" → Sender email not verified