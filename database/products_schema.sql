-- Digital Products Schema
-- Products table for storing AI guides and reports

CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    problem_statement TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    who_its_for JSONB DEFAULT '[]'::jsonb,
    price_inr INTEGER NOT NULL,
    original_price_inr INTEGER,
    product_type TEXT NOT NULL CHECK (product_type IN ('guide', 'report', 'bundle', 'sheet')),
    file_url TEXT,
    preview_images JSONB DEFAULT '[]'::jsonb,
    page_count INTEGER,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    sales_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bundle products relationship
CREATE TABLE IF NOT EXISTS product_bundles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    bundle_id UUID REFERENCES products(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(bundle_id, product_id)
);

-- FAQs for products
CREATE TABLE IF NOT EXISTS product_faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials for products
CREATE TABLE IF NOT EXISTS product_testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_role TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_verified BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_bundles_bundle ON product_bundles(bundle_id);
CREATE INDEX IF NOT EXISTS idx_product_faqs_product ON product_faqs(product_id);
CREATE INDEX IF NOT EXISTS idx_product_testimonials_product ON product_testimonials(product_id);

-- Insert sample products
INSERT INTO products (slug, title, subtitle, description, problem_statement, price_inr, original_price_inr, product_type, page_count, is_featured, features, who_its_for) VALUES
('best-ai-tools-india', 'Best AI Tools for Students & Creators in India (2026)', 'India-focused, practical, updated yearly', 'A comprehensive guide to choosing the right AI tools without wasting money. Includes detailed comparisons, pricing in ₹, and recommendations for Indian users.', 'With 1000+ AI tools launching every month, how do you choose the right one? Most people waste money on tools they never use or pick the wrong tool for their needs.', 399, 599, 'guide', 35, true,
'["50+ AI tools reviewed and compared", "Pricing in ₹ for Indian users", "Category-wise recommendations", "Free vs Paid comparisons", "Step-by-step setup guides", "Real use cases for students & creators", "Monthly updates for 1 year"]'::jsonb,
'["Students looking to boost productivity", "Content creators and YouTubers", "Freelancers and solopreneurs", "Small business owners", "Anyone confused by too many AI tools"]'::jsonb),

('ai-tools-comparison-sheet', 'AI Tools Comparison Sheet (50 Tools)', 'Compare features, pricing, and use cases at a glance', 'A detailed comparison spreadsheet of 50 popular AI tools with pricing, features, pros/cons, and recommendations.', NULL, 199, 299, 'sheet', NULL, false,
'["50 AI tools compared side-by-side", "Pricing in ₹", "Feature comparison matrix", "Pros and cons for each tool", "Best use cases", "Editable Google Sheet format"]'::jsonb,
'["Anyone researching AI tools", "Teams evaluating software", "Students doing projects", "Businesses planning AI adoption"]'::jsonb);

-- Insert bundle
INSERT INTO products (slug, title, subtitle, description, price_inr, original_price_inr, product_type, is_featured, features) VALUES
('complete-ai-toolkit', 'Complete AI Toolkit Bundle', 'Get both the guide and comparison sheet', 'Save ₹99 when you buy both products together. Perfect for serious AI tool researchers.', 499, 598, 'bundle', true,
'["Best AI Tools Guide (₹399 value)", "AI Tools Comparison Sheet (₹199 value)", "Lifetime access to both", "Free updates for 1 year", "Save ₹99"]'::jsonb);

-- Link bundle products
INSERT INTO product_bundles (bundle_id, product_id)
SELECT 
    (SELECT id FROM products WHERE slug = 'complete-ai-toolkit'),
    id
FROM products 
WHERE slug IN ('best-ai-tools-india', 'ai-tools-comparison-sheet');

-- Insert FAQs
INSERT INTO product_faqs (product_id, question, answer, display_order) VALUES
((SELECT id FROM products WHERE slug = 'best-ai-tools-india'), 
'Is this guide updated regularly?', 
'Yes! You get free updates for 1 year. We update the guide every quarter with new tools and pricing changes.', 1),

((SELECT id FROM products WHERE slug = 'best-ai-tools-india'), 
'What format is the guide in?', 
'You''ll receive a PDF file that works on any device. It''s designed to be easy to read on mobile, tablet, or desktop.', 2),

((SELECT id FROM products WHERE slug = 'best-ai-tools-india'), 
'Can I get a refund?', 
'Yes! If you''re not satisfied within 7 days, email us for a full refund. No questions asked.', 3),

((SELECT id FROM products WHERE slug = 'best-ai-tools-india'), 
'Is the pricing really in Indian Rupees?', 
'Absolutely! All tools are priced in ₹ and we focus on tools that work well for Indian users and accept Indian payment methods.', 4),

((SELECT id FROM products WHERE slug = 'best-ai-tools-india'), 
'How do I access the guide after purchase?', 
'Immediately after payment, you''ll get a download link. We''ll also email you a permanent access link.', 5);

-- Insert sample testimonials
INSERT INTO product_testimonials (product_id, author_name, author_role, content, rating, is_verified, display_order) VALUES
((SELECT id FROM products WHERE slug = 'best-ai-tools-india'),
'Priya Sharma', 'Content Creator, Mumbai',
'This guide saved me so much time! I was overwhelmed by all the AI tools out there. Now I know exactly which ones to use for my YouTube channel.',
5, true, 1),

((SELECT id FROM products WHERE slug = 'best-ai-tools-india'),
'Rahul Verma', 'Engineering Student, Bangalore',
'Finally, a guide with pricing in rupees! The comparisons are super helpful and the recommendations are spot-on for students.',
5, true, 2),

((SELECT id FROM products WHERE slug = 'best-ai-tools-india'),
'Anjali Patel', 'Freelance Designer, Ahmedabad',
'Worth every rupee. The guide helped me choose the right design tools and I''m already saving money by avoiding unnecessary subscriptions.',
4, true, 3);
