import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { tools, categories, getToolReviews } from '@/lib/data';
import AuthorBox from '@/components/AuthorBox';
import ReviewMethodology from '@/components/ReviewMethodology';
import Disclosure from '@/components/Disclosure';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = tools.find(t => t.slug === slug);
    if (!tool) return { title: 'Tool Not Found' };
    const year = 2026;

    // Custom SEO overrides for specific tools
    const customMeta: Record<string, { title: string; description: string }> = {
        'murf-ai': {
            title: `Murf AI Review & Pricing in India (${year}) – Best AI Voice Tool?`,
            description: 'Explore Murf AI features, pricing in India, use cases, pros & cons and alternatives like ElevenLabs.',
        },
    };

    const custom = customMeta[slug];
    const title = custom?.title || `${tool.name} Review (${year}): Pricing in India, Pros & Cons & Verdict`;
    const description = custom?.description || `${tool.name} ${year} Review: Get the latest honest verdict on ${tool.name}. Explore features, pricing in Indian Rupees (₹), and how it helps Indian users.`;

    return {
        title,
        description,
        openGraph: {
            title: `${tool.name} Review (${year}) | AIBrainX.in`,
            description: `Read our comprehensive ${year} review of ${tool.name} including India-specific pricing and features.`,
            locale: 'en_IN',
            type: 'website',
        },
        alternates: {
            canonical: `https://aibrainx.in/tools/${slug}`,
        }
    };
}

export function generateStaticParams() {
    return tools.map(t => ({ slug: t.slug }));
}

export default async function ToolDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const tool = tools.find(t => t.slug === slug);
    if (!tool) notFound();

    const category = categories.find(c => c.id === tool.category_id);
    const toolReviews = getToolReviews(tool.id);
    const relatedTools = tools.filter(t => t.category_id === tool.category_id && t.id !== tool.id && t.status === 'approved').slice(0, 3);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: tool.name,
                description: tool.tagline,
                url: tool.url,
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Windows, macOS, Web',
                brand: {
                    '@type': 'Brand',
                    name: tool.name
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: tool.rating,
                    reviewCount: tool.review_count,
                    bestRating: 5,
                    worstRating: 1
                },
                review: {
                    '@type': 'Review',
                    author: {
                        '@type': 'Person',
                        name: 'AIBrainX Editorial Team'
                    },
                    reviewBody: `${tool.name} is one of the top AI tools for ${category?.name || 'AI enthusiasts'} in India, offering great value and unique features for ${tool.tags.slice(0, 3).join(', ')}.`,
                    reviewRating: {
                        '@type': 'Rating',
                        ratingValue: tool.rating,
                        bestRating: 5
                    }
                },
                offers: {
                    '@type': 'Offer',
                    price: tool.pricing === 'free' ? '0' : undefined,
                    priceCurrency: 'INR',
                    availability: 'https://schema.org/InStock',
                    url: tool.url
                }
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'Home',
                        'item': 'https://aibrainx.in'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': 'AI Tools',
                        'item': 'https://aibrainx.in/tools'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': category?.name || 'Category',
                        'item': `https://aibrainx.in/tools?category=${category?.slug}`
                    },
                    {
                        '@type': 'ListItem',
                        'position': 4,
                        'name': tool.name,
                        'item': `https://aibrainx.in/tools/${tool.slug}`
                    }
                ]
            }
        ]
    };

    // Extract key features from description
    const descriptionParts = tool.description.split('\n\n');
    const featuresSection = descriptionParts.find(part => part.includes('## Key Features') || part.includes('## What'));

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className={styles.page}>
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className={styles.breadcrumb}>
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/tools">AI Tools</Link>
                        <span>/</span>
                        {category && <>
                            <Link href={`/tools?category=${category.slug}`}>{category.name}</Link>
                            <span>/</span>
                        </>}
                        <span className={styles.breadcrumbCurrent}>{tool.name}</span>
                    </nav>

                    {/* Tool Header - Enhanced */}
                    <div className={styles.heroSection}>
                        <div className={styles.toolHeader}>
                            <div className={styles.toolHeaderLeft}>
                                <div className={styles.toolLogo}>
                                    <span>{category?.icon || '🤖'}</span>
                                </div>
                                <div>
                                    <div className={styles.toolMeta}>
                                        <span className={`badge ${tool.pricing === 'free' ? 'badge-free' : tool.pricing === 'freemium' ? 'badge-new' : 'badge-paid'}`}>
                                            {tool.pricing}
                                        </span>
                                        {tool.featured && <span className="badge badge-featured">⭐ Featured</span>}
                                        {category && <span className={styles.toolCategory}>{category.name}</span>}
                                    </div>
                                    <h1 className={styles.toolName}>{tool.name}</h1>
                                    <p className={styles.toolTagline}>{tool.tagline}</p>

                                    {/* Rating inline */}
                                    <div className={styles.ratingInline}>
                                        <span className={styles.ratingNumber}>{tool.rating}</span>
                                        <div className={styles.stars}>{'★'.repeat(Math.round(tool.rating))}{'☆'.repeat(5 - Math.round(tool.rating))}</div>
                                        <span className={styles.reviewCount}>({tool.review_count} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.toolActions}>
                                <a href={tool.url} target="_blank" rel="noopener noreferrer sponsored" className="btn btn-primary btn-lg">
                                    Try {tool.name} →
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentGrid}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            {/* Description */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>About {tool.name}</h2>
                                <div className={styles.description}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            h3: ({ node, ...props }) => <h3 {...props} className={styles.descH3} />,
                                            ul: ({ node, ...props }) => <ul {...props} className={styles.descList} />,
                                            ol: ({ node, ...props }) => <ol {...props} className={styles.descList} />,
                                            table: ({ node, ...props }) => (
                                                <div className={styles.tableWrapper}>
                                                    <table {...props} className={styles.pricingTable} />
                                                </div>
                                            ),
                                            a: ({ node, ...props }) => {
                                                const isInternal = props.href?.startsWith('/') || props.href?.includes('aibrainx.in');
                                                if (isInternal) {
                                                    return <Link href={props.href || '#'} className="text-primary hover:underline">{props.children}</Link>;
                                                }
                                                return <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />;
                                            }
                                        }}
                                    >
                                        {tool.description}
                                    </ReactMarkdown>
                                </div>
                            </section>

                            {/* EEAT Components Integration */}
                            <AuthorBox />
                            <ReviewMethodology />
                            <Disclosure />

                            {/* Pricing Details Card - Enhanced */}
                            {tool.pricing_details && (
                                <section className={styles.section}>
                                    <h2 className={styles.sectionTitle}>💰 Pricing & Plans</h2>
                                    <div className={styles.pricingCard}>
                                        <p>{tool.pricing_details}</p>
                                    </div>
                                </section>
                            )}

                            {/* Reviews */}
                            <section className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionTitle}>⭐ User Reviews ({toolReviews.length})</h2>
                                    <button className="btn btn-secondary btn-sm">Write a Review</button>
                                </div>
                                {toolReviews.length > 0 ? (
                                    <div className={styles.reviewsList}>
                                        {toolReviews.map(review => (
                                            <div key={review.id} className={styles.reviewCard}>
                                                <div className={styles.reviewHeader}>
                                                    <div className={styles.reviewAvatar}>{review.user_name.charAt(0)}</div>
                                                    <div>
                                                        <span className={styles.reviewAuthor}>{review.user_name}</span>
                                                        <div className={styles.reviewStars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                                                    </div>
                                                    <span className={styles.reviewDate}>
                                                        {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                </div>
                                                <p className={styles.reviewComment}>{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
                                )}
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            {/* Quick Info */}
                            <div className={styles.sidebarCard}>
                                <h3 className={styles.sidebarTitle}>📊 Quick Info</h3>
                                <div className={styles.infoList}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Category</span>
                                        <span className={styles.infoValue}>{category?.name}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Pricing</span>
                                        <span className={styles.infoValue} style={{ textTransform: 'capitalize' }}>{tool.pricing}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Rating</span>
                                        <span className={styles.infoValue}>{tool.rating}/5 ⭐</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Reviews</span>
                                        <span className={styles.infoValue}>{tool.review_count}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Added</span>
                                        <span className={styles.infoValue}>
                                            {new Date(tool.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className={styles.sidebarCard}>
                                <h3 className={styles.sidebarTitle}>🏷️ Tags</h3>
                                <div className={styles.tagsList}>
                                    {tool.tags.map(tag => (
                                        <span key={tag} className="tag">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Related Tools */}
                            {relatedTools.length > 0 && (
                                <div className={styles.sidebarCard}>
                                    <h3 className={styles.sidebarTitle}>🔗 Related Tools</h3>
                                    <div className={styles.relatedList}>
                                        {relatedTools.map(rt => (
                                            <Link key={rt.id} href={`/tools/${rt.slug}`} className={styles.relatedItem}>
                                                <span className={styles.relatedIcon}>{categories.find(c => c.id === rt.category_id)?.icon}</span>
                                                <div>
                                                    <span className={styles.relatedName}>{rt.name}</span>
                                                    <span className={styles.relatedRating}>★ {rt.rating}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share Section */}
                            <div className={styles.sidebarCard}>
                                <h3 className={styles.sidebarTitle}>📢 Share</h3>
                                <div className={styles.shareButtons}>
                                    <a href={`https://twitter.com/intent/tweet?text=Check out ${tool.name} - ${tool.tagline}&url=${encodeURIComponent(`https://aibrainx.in/tools/${tool.slug}`)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} title="Share on Twitter">
                                        𝕏
                                    </a>
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://aibrainx.in/tools/${tool.slug}`)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} title="Share on LinkedIn">
                                        in
                                    </a>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(`Check out ${tool.name}: ${tool.tagline} https://aibrainx.in/tools/${tool.slug}`)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} title="Share on WhatsApp">
                                        📱
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
