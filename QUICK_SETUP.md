# Quick Setup Guide - Razorpay & Email

## 🚀 Step-by-Step Setup Instructions

### 1️⃣ Get Supabase Service Role Key (Required for Database)

1. Go to your Supabase project: https://supabase.com/dashboard/project/ziotlhrbsaaqdsxovhxh
2. Click **Settings** (gear icon) → **API**
3. Scroll down to **Project API keys**
4. Copy the **`service_role`** key (⚠️ Keep this secret!)
5. In your `.env.local` file, replace:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
   with your actual service role key

---

### 2️⃣ Set Up Razorpay (Required for Payments)

#### A. Create Razorpay Account
1. Go to https://razorpay.com/
2. Click **Sign Up** (top right)
3. Fill in your details and verify your email
4. Complete the onboarding

#### B. Get Test API Keys
1. After logging in, go to **Settings** → **API Keys**
2. Click **Generate Test Key** button
3. You'll see two keys:
   - **Key ID** (starts with `rzp_test_...`)
   - **Key Secret** (click "Show" to reveal)
4. Copy both keys

#### C. Add to .env.local
Replace these lines in your `.env.local`:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

With your actual keys:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
```

#### D. Restart Dev Server
After adding the keys, restart your dev server:
```bash
# Press Ctrl+C to stop the current server
# Then run:
npm run dev
```

---

### 3️⃣ Test Razorpay Payment (After Setup)

1. Go to http://localhost:3000/ai-guides/best-ai-tools-india
2. Click **"Buy & Download Instantly"**
3. Razorpay checkout should open
4. Use these **test card details**:
   - Card Number: `4111 1111 1111 1111`
   - CVV: `123` (any 3 digits)
   - Expiry: `12/25` (any future date)
   - Name: Your name
5. Click Pay
6. You should be redirected to `/thank-you` page

---

### 4️⃣ Set Up Email Sending (Optional but Recommended)

Currently, email subscriptions are saved to the database but **no emails are sent**. To send emails:

#### Option A: Use Resend (Recommended)

1. Go to https://resend.com/ and sign up
2. Verify your email
3. Go to **API Keys** → **Create API Key**
4. Copy the API key
5. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
   ```
6. Install Resend package:
   ```bash
   npm install resend
   ```

#### Option B: Use Gmail SMTP (Alternative)

If you prefer Gmail, you can use nodemailer instead. Let me know if you want this option.

---

### 5️⃣ Run Database Migrations (Required)

You need to create the database tables:

1. Go to your Supabase project: https://supabase.com/dashboard/project/ziotlhrbsaaqdsxovhxh
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Run these SQL files **in order**:

**First:** Copy and paste `database/products_schema.sql` → Click **Run**

**Second:** Copy and paste `database/orders_schema.sql` → Click **Run**

**Third:** Copy and paste `database/subscribers_schema.sql` → Click **Run**

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Supabase Service Role Key added to `.env.local`
- [ ] Razorpay Test Keys added to `.env.local`
- [ ] Dev server restarted
- [ ] Database migrations run in Supabase
- [ ] Test payment works with test card
- [ ] Email subscription saves to database
- [ ] (Optional) Resend API key added for email sending

---

## 🆘 Troubleshooting

### Payment button doesn't work
- Check browser console for errors
- Verify Razorpay keys are correct
- Make sure you restarted the dev server
- Check that `NEXT_PUBLIC_RAZORPAY_KEY_ID` starts with `rzp_test_`

### "Cannot find module 'razorpay'" error
- The package is already installed
- Restart your dev server

### Email not being sent
- This is expected! Email sending is not implemented yet
- Emails are being saved to the database
- To send emails, you need to set up Resend (see Step 4)

---

## 📝 Next Steps After Basic Setup

1. **Implement Email Sending** - Add Resend integration to actually send emails
2. **Upload Product Files** - Add your actual PDF guides to Supabase Storage
3. **Test Complete Flow** - Test payment → download → email
4. **Go Live** - Switch to Razorpay Live keys when ready

---

## Need Help?

If you get stuck on any step, let me know which step and what error you're seeing!
