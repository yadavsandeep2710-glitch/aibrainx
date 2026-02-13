# Vercel Deployment Guide

## 🚀 Deploy Your AIBrainX Digital Products Store to Vercel

Follow these steps to deploy your application to production.

---

## Step 1: Prepare Your Repository

### A. Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Digital products system"
```

### B. Push to GitHub
1. Create a new repository on GitHub: https://github.com/new
2. Name it: `aibrainx` (or any name you prefer)
3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/aibrainx.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### A. Sign Up / Log In to Vercel
1. Go to https://vercel.com/
2. Click **"Sign Up"** or **"Log In"**
3. Use your GitHub account to sign in

### B. Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Select your GitHub repository (`aibrainx`)
3. Click **"Import"**

### C. Configure Build Settings
Vercel should auto-detect Next.js. Verify these settings:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

Click **"Deploy"** (but wait! You need to add environment variables first)

---

## Step 3: Add Environment Variables

**BEFORE deploying**, click **"Environment Variables"** and add these:

### Required Environment Variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ziotlhrbsaaqdsxovhxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppb3RsaHJic2FhcWRzeG92aHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NDUyODUsImV4cCI6MjA4NjAyMTI4NX0.AkBKHBgBA7-qb0GRTKz2OkYq-wcLV2pW96ii-9caocg
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppb3RsaHJic2FhcWRzeG92aHhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ0NTI4NSwiZXhwIjoyMDg2MDIxMjg1fQ.KNc3DAh-M9wQlveoctcjspdNU5jUfjZG6XyeG9vbjh4

# Admin
ADMIN_PASSWORD=admin123

# Razorpay (LIVE KEYS)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_SFbADdaLLrRWRs
RAZORPAY_KEY_SECRET=fBJmPdfJfLdsHEw3C1E5Jl5s

# Resend
RESEND_API_KEY=re_PhTnc8bn_PoLyUiPxKERuRXkNeYydFc9o

# Site URL (Update this after deployment!)
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
```

**Important:** 
- Add each variable one by one
- Select **"Production"**, **"Preview"**, and **"Development"** for all variables
- After deployment, update `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL

---

## Step 4: Deploy!

1. After adding all environment variables, click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll see a success screen with your live URL!

---

## Step 5: Update Site URL

1. Copy your Vercel URL (e.g., `https://aibrainx.vercel.app`)
2. Go to **Project Settings** → **Environment Variables**
3. Edit `NEXT_PUBLIC_SITE_URL` and replace with your actual URL
4. Click **"Save"**
5. Redeploy: Go to **Deployments** → Click **"..."** on latest → **"Redeploy"**

---

## Step 6: Post-Deployment Setup

### A. Verify Resend Domain
1. Go to https://resend.com/domains
2. Add your domain (or use Vercel domain)
3. Add DNS records if using custom domain
4. Verify domain

### B. Update Razorpay Webhook (Optional)
1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://your-app.vercel.app/api/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`

### C. Test Everything
1. Visit your live site
2. Test free guide signup → Check email
3. Test payment flow → Check email & download
4. Verify orders in Supabase

---

## Step 7: Custom Domain (Optional)

### A. Add Custom Domain in Vercel
1. Go to **Project Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain: `aibrainx.in`
4. Follow DNS configuration instructions

### B. Update DNS Records
Add these records in your domain registrar:
- **Type:** A
- **Name:** @
- **Value:** 76.76.21.21 (Vercel's IP)

Or use CNAME:
- **Type:** CNAME
- **Name:** www
- **Value:** cname.vercel-dns.com

### C. Update Environment Variables
After domain is active:
1. Update `NEXT_PUBLIC_SITE_URL` to `https://aibrainx.in`
2. Redeploy

---

## 🎉 You're Live!

Your digital products store is now live and accepting real payments!

### Next Steps:
- [ ] Upload actual PDF guides to Supabase Storage
- [ ] Update product file URLs in database
- [ ] Test complete purchase flow
- [ ] Monitor orders in Supabase
- [ ] Check email delivery

---

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Make sure `package.json` has all dependencies

### Emails Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for logs
- Verify domain is verified in Resend

### Payment Fails
- Check Razorpay keys are correct (LIVE not TEST)
- Verify Supabase Service Role Key is set
- Check browser console for errors

### 404 Errors
- Clear Vercel cache and redeploy
- Check file paths are correct
- Verify all pages are in `src/app` directory

---

## 📞 Need Help?

If you encounter any issues during deployment, check:
1. Vercel build logs
2. Browser console
3. Supabase logs
4. Razorpay dashboard

Good luck with your launch! 🚀
