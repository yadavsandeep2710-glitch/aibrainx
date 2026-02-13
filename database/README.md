# Database Setup Instructions

Follow these steps to set up the reviews table in your Supabase database:

## Step 1: Access Supabase SQL Editor

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

## Step 2: Run the Schema SQL

Copy and paste the contents of `database/reviews_schema.sql` into the SQL editor and click **Run**.

This will:
- Create the `reviews` table
- Set up Row Level Security (RLS) policies
- Create indexes for performance
- Add triggers for auto-updating timestamps

## Step 3: Verify the Table

1. Go to **Table Editor** in the left sidebar
2. You should see a new table called `reviews`

## What's Created

### Tables
- **reviews** - Stores all user reviews for tools and blog posts

### Columns
- `id` - UUID primary key
- `user_id` - References auth.users (who wrote the review)
- `user_email`, `user_name`, `user_avatar` - User info cached for display
- `content_type` - Either 'tool' or 'blog'
- `content_id` - The ID of the tool or blog post
- `rating` - 1-5 star rating
- `comment` - Review text
- `created_at`, `updated_at` - Timestamps

### Security (RLS Policies)
- ✅ Anyone can READ reviews
- ✅ Authenticated users can CREATE reviews
- ✅ Users can UPDATE their own reviews
- ✅ Users can DELETE their own reviews
- ✅ One review per user per content item (enforced by unique constraint)

That's it! Your database is ready to accept reviews.
