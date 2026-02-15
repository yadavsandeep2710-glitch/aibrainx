-- Create blog_posts table
create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image_url text,
  category text,
  tags text[],
  author text default 'AIBrainX Team',
  published boolean default false,
  published_at timestamptz,
  read_time int,
  views int default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table blog_posts enable row level security;

-- Policies
-- Public read access for everyone (so blog posts can be seen)
create policy "Public posts are viewable by everyone"
  on blog_posts for select
  using ( true );

-- Admin only write access (using service role or authenticated admin user if we had one, 
-- but for now we'll allow authenticated users to write if they are admins. 
-- Since we are using a simple admin panel with restricted access, we might need a stricter policy later.
-- For now, let's assume the API handles authcheck, or we use a service role key for admin actions).

-- Actually, better to allow full access to authenticated users for now if we are using Supabase Auth for admin,
-- or just open it up if we are relying on the app's admin protection (which is risky but fits the current 'admin-login' flow).
-- Let's stick to: Authenticated users can insert/update/delete.
create policy "Authenticated users can manage posts"
  on blog_posts for all
  using ( auth.role() = 'authenticated' );
