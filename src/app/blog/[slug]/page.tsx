import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts } from '@/lib/store';
import BlogPostContent from '@/components/BlogPostContent';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | AIBrainX',
        };
    }

    return {
        title: post.meta_title || `${post.title} | AIBrainX`,
        description: post.meta_description || post.excerpt,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt,
            url: `https://aibrainx.in/blog/${post.slug}`,
            images: post.cover_image_url ? [{ url: post.cover_image_url, alt: post.title }] : [],
            type: 'article',
            publishedTime: post.published_at || undefined,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt,
            images: post.cover_image_url ? [post.cover_image_url] : [],
        },
    };
}

export default async function BlogArticlePage({ params }: PageProps) {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    let post = await getPostBySlug(slug);

    if (!post) {
        // Fallback: Try a sanitized version of the slug (common if URL has spaces/caps)
        const sanitizedSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (sanitizedSlug !== slug) {
            post = await getPostBySlug(sanitizedSlug);
        }
    }

    if (!post) {
        notFound();
    }

    // Fetch related posts (simple logic: get latest 3 published excluding current)
    // In a real app, you might match tags or categories.
    const allPublished = await getPublishedPosts();
    const relatedPosts = allPublished.filter(p => p.id !== post.id).slice(0, 3);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: post.title,
                        description: post.excerpt,
                        image: post.cover_image_url,
                        datePublished: post.published_at,
                        author: { '@type': 'Organization', name: post.author },
                        publisher: { '@type': 'Organization', name: 'AIBrainX.in' },
                    }),
                }}
            />
            <BlogPostContent post={post} relatedPosts={relatedPosts} />
        </>
    );
}
