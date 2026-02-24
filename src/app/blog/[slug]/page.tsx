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

    const PROMPT_ENGINEERING_SLUG = 'how-to-write-ai-prompts-a-beginner-s-guide-with-examples-2026';
    const isPromptPost = post.slug === PROMPT_ENGINEERING_SLUG || slug === PROMPT_ENGINEERING_SLUG;

    return (
        <>
            {/* Structured Data Verification v1.1 - Added: 2026-02-24 */}
            {isPromptPost ? (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "What is an AI prompt?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "An AI prompt is an instruction or question given to an AI tool to generate a response. Clear and detailed prompts help AI provide more accurate and useful answers."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How do I write good AI prompts as a beginner?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Beginners should write clear prompts by defining the task, adding context, specifying the audience, and mentioning the desired format or tone."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Are AI prompts useful for students in India?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, AI prompts help Indian students with exam preparation, notes, assignments, and understanding complex topics using simple explanations."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Can AI prompts help with SEO and content writing?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, well-written AI prompts can generate SEO-friendly blog posts, meta descriptions, FAQs, and content ideas when proper structure and keywords are provided."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Is AI prompt writing a useful skill in 2026?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Absolutely. AI prompt writing is a valuable skill for students, professionals, freelancers, and businesses to improve productivity and efficiency."
                                        }
                                    }
                                ]
                            })
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": "How to Write AI Prompts: A Beginner’s Guide with Practical Examples (2026)",
                                "description": "Learn how to write AI prompts with simple steps and real examples. This beginner-friendly 2026 guide helps students and professionals in India get better AI results.",
                                "image": "https://www.aibrainx.in/wp-content/uploads/how-to-write-ai-prompts-beginner-guide-2026.jpg",
                                "author": {
                                    "@type": "Organization",
                                    "name": "AIBrainX"
                                },
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "AIBrainX",
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://www.aibrainx.in/wp-content/uploads/aibrainx-logo.png"
                                    }
                                },
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": "https://www.aibrainx.in/blog/how-to-write-ai-prompts-a-beginner-s-guide-with-examples-2026"
                                },
                                "datePublished": "2026-02-11",
                                "dateModified": "2026-02-24",
                                "inLanguage": "en-IN",
                                "articleSection": "AI Prompts",
                                "keywords": [
                                    "AI prompts",
                                    "how to write AI prompts",
                                    "AI prompt writing",
                                    "AI prompts for beginners",
                                    "AI prompt examples",
                                    "AI prompts India",
                                    "AI prompts 2026"
                                ]
                            })
                        }}
                    />
                </>
            ) : (
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
            )}
            <BlogPostContent post={post} relatedPosts={relatedPosts} />
        </>
    );
}
