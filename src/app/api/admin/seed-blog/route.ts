
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';
import { BLOG_POSTS_SEED } from '@/lib/blog-content-seed';

export async function POST(request: NextRequest) {
    // 1. Verify admin session cookie
    const adminSession = request.cookies.get('admin_session');
    // Allow if in dev mode or if cookie is present
    if (!adminSession && process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 2. Init Admin Client
        const supabase = createAdminClient();

        const results = [];

        // 3. Loop and upsert
        for (const post of BLOG_POSTS_SEED) {
            // Calculate read time
            const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
            const readTime = (post as any).read_time || Math.ceil(wordCount / 200);

            const { data, error } = await supabase
                .from('blog_posts')
                .upsert({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    cover_image_url: post.cover_image_url,
                    category: post.category,
                    tags: post.tags,
                    author: (post as any).author || 'AI BrainX Team',
                    read_time: readTime,
                    published_at: (post as any).published_at || new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    meta_title: (post as any).meta_title || post.title,
                    meta_description: (post as any).meta_description || post.excerpt
                }, { onConflict: 'slug' })
                .select();

            if (error) {
                console.error(`Error seeding ${post.slug}:`, error);
            }
            results.push({ slug: post.slug, status: error ? 'error' : 'success', error });
        }

        return NextResponse.json({ message: 'Seed complete', results });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
