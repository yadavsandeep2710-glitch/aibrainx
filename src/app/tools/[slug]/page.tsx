import Link from 'next/link';
import { tools, categories, getToolReviews } from '@/lib/data';
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
    return {
        title: `${tool.name} — ${tool.tagline}`,
        description: `${tool.name}: ${tool.tagline}. Read reviews, compare pricing in ₹, and discover if it's right for you.`,
        openGraph: {
            title: `${tool.name} — AI Tool Review | AIBrainX.in`,
            description: tool.tagline,
        },
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
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.tagline,
        url: tool.url,
        applicationCategory: 'AI Tool',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool.rating,
            reviewCount: tool.review_count,
            bestRating: 5,
        },
        offers: {
            '@type': 'Offer',
            price: tool.pricing === 'free' ? '0' : undefined,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
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
                                    {tool.description.split('\n\n').map((para, i) => {
                                        const cleanedPara = para.replace(/\*\*/g, '');
                                        if (cleanedPara.startsWith('## ')) {
                                            return <h3 key={i} className={styles.descH3}>{cleanedPara.replace('## ', '')}</h3>;
                                        }
                                        if (para.startsWith('- ')) {
                                            return (
                                                <ul key={i} className={styles.descList}>
                                                    {para.split('\n').map((item, j) => (
                                                        <li key={j}>{item.replace(/^\- \*\*(.+?)\*\*(.*)/, '$1$2').replace('- ', '').replace(/\*\*/g, '')}</li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        if (para.startsWith('| ')) {
                                            // Handle tables
                                            const rows = para.split('\n');
                                            return (
                                                <div key={i} className={styles.tableWrapper}>
                                                    <table className={styles.pricingTable}>
                                                        <thead>
                                                            <tr>
                                                                {rows[0].split('|').filter(Boolean).map((cell, idx) => (
                                                                    <th key={idx}>{cell.trim()}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rows.slice(2).map((row, rowIdx) => (
                                                                <tr key={rowIdx}>
                                                                    {row.split('|').filter(Boolean).map((cell, cellIdx) => (
                                                                        <td key={cellIdx}>{cell.trim()}</td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        }
                                        return <p key={i}>{cleanedPara}</p>;
                                    })}
                                </div>
                            </section>

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
