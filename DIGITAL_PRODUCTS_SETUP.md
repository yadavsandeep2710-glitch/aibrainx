# Digital Products System Setup Guide

This guide will help you set up the digital products selling system for AIBrainX.in.

## Prerequisites

1. **Supabase Project**: You should already have a Supabase project set up
2. **Razorpay Account**: Sign up at https://razorpay.com/
3. **Resend Account** (Optional): For email automation - sign up at https://resend.com/

## Step 1: Database Setup

Run the following SQL scripts in your Supabase SQL Editor (in order):

1. `database/products_schema.sql` - Creates products, FAQs, and testimonials tables
2. `database/orders_schema.sql` - Creates orders, order_items, and downloads tables
3. `database/subscribers_schema.sql` - Creates email subscribers and automation log tables

## Step 2: Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Existing Supabase variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay (for payment processing)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Resend (for email automation - optional)
RESEND_API_KEY=your_resend_api_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Getting Razorpay Keys

1. Sign up at https://razorpay.com/
2. Go to Settings → API Keys
3. Generate Test Keys for development
4. Copy the Key ID and Key Secret
5. For production, generate Live Keys

### Getting Resend API Key (Optional)

1. Sign up at https://resend.com/
2. Go to API Keys
3. Create a new API key
4. Copy the key

## Step 3: Vercel Environment Variables

If deploying to Vercel, add all the above environment variables to your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable for Production, Preview, and Development environments

## Step 4: Upload Product Files

1. Create a Supabase Storage bucket called `products`
2. Upload your PDF guides to this bucket
3. Update the `file_url` in the products table with the public URLs

Example:
```sql
UPDATE products 
SET file_url = 'https://your-project.supabase.co/storage/v1/object/public/products/best-ai-tools-india.pdf'
WHERE slug = 'best-ai-tools-india';
```

## Step 5: Test Payment Flow

1. Start your development server: `npm run dev`
2. Navigate to `/ai-guides/best-ai-tools-india`
3. Click "Buy & Download Instantly"
4. Use Razorpay test card details:
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
5. Complete the payment
6. Verify you're redirected to `/thank-you` with download link

## Step 6: Email Automation Setup (Optional)

To set up automated emails with Resend:

1. Create email templates in Resend dashboard
2. Update the API routes to send emails:
   - `/api/subscribe/route.ts` - Send free guide email
   - `/api/payment/verify/route.ts` - Send purchase confirmation email

Example email sending code:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'AIBrainX <noreply@aibrainx.in>',
  to: email,
  subject: 'Your AI Tools Guide',
  html: '<p>Thank you for your purchase!</p>',
});
```

## Step 7: Production Checklist

Before going live:

- [ ] Switch Razorpay from Test Mode to Live Mode
- [ ] Update all environment variables in Vercel
- [ ] Upload actual product files to Supabase Storage
- [ ] Test the complete payment flow in production
- [ ] Set up email automation with Resend
- [ ] Configure proper email sender domain
- [ ] Test email delivery
- [ ] Enable RLS policies on Supabase tables
- [ ] Set up proper error monitoring

## Troubleshooting

### Payment not working
- Check Razorpay API keys are correct
- Verify environment variables are loaded
- Check browser console for errors
- Ensure Razorpay script is loading

### Download not working
- Verify product `file_url` is set correctly
- Check Supabase Storage bucket is public
- Verify download token generation function exists

### Email not sending
- Check Resend API key is valid
- Verify sender domain is configured
- Check email logs in Resend dashboard

## Support

For issues or questions:
- Email: support@aibrainx.in
- Check Supabase logs for database errors
- Check Vercel logs for deployment errors
