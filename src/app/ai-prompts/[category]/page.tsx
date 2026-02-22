import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { promptCategories, getPromptsByCategory, getPromptCategory, getAllCategorySlugs } from '@/data/prompt-data';
import PromptFAQ from '@/components/PromptFAQ';
import PromptFilterSection from '@/components/PromptFilterSection';
import { blogPosts } from '@/lib/data';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return getAllCategorySlugs().map(slug => ({ category: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const cat = getPromptCategory(categorySlug);

    if (!cat) {
        return { title: 'Category Not Found' };
    }

    return {
        title: cat.meta_title,
        description: cat.meta_description,
        keywords: cat.meta_keywords,
        openGraph: {
            title: cat.meta_title,
            description: cat.meta_description,
            type: 'article',
            url: `https://aibrainx.in/ai-prompts/${cat.slug}`,
        },
        alternates: {
            canonical: `https://aibrainx.in/ai-prompts/${cat.slug}`,
        },
    };
}

export default async function PromptCategoryPage({ params }: PageProps) {
    const { category: categorySlug } = await params;
    const cat = getPromptCategory(categorySlug);

    if (!cat) {
        notFound();
    }

    const categoryPrompts = getPromptsByCategory(categorySlug);
    const otherCategories = promptCategories.filter(c => c.slug !== categorySlug);

    // Get related blog posts
    const relatedBlogs = blogPosts.filter(post =>
        cat.related_blog_slugs.includes(post.slug)
    );

    // JSON-LD: Article Schema
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: cat.name,
        description: cat.meta_description,
        url: `https://aibrainx.in/ai-prompts/${cat.slug}`,
        publisher: {
            '@type': 'Organization',
            name: 'AIBrainX',
            url: 'https://aibrainx.in',
        },
        dateModified: cat.extended_content?.eeat?.last_updated || '2026-02-22',
    };

    // JSON-LD: BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aibrainx.in' },
            { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: 'https://aibrainx.in/ai-prompts' },
            { '@type': 'ListItem', position: 3, name: cat.name, item: `https://aibrainx.in/ai-prompts/${cat.slug}` },
        ],
    };

    // JSON-LD: ItemList Schema for Prompts
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${cat.name} Library`,
        description: `Browse ${categoryPrompts.length} high-quality AI prompts for ${cat.name.toLowerCase()}.`,
        numberOfItems: categoryPrompts.length,
        itemListElement: categoryPrompts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'ListItem',
                name: p.title,
                description: p.description,
                url: `https://aibrainx.in/ai-prompts/${cat.slug}#${p.id}`,
            }
        }))
    };

    const subCategories = categorySlug === 'ai-prompts-for-indian-business'
        ? ['GST', 'Startup', 'Marketing', 'MSME', 'E-commerce', 'HR', 'Customer Support']
        : undefined;

    return (
        <div className={styles.page}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

            {/* Breadcrumb */}
            <div className={`container ${styles.breadcrumb}`}>
                <Link href="/">Home</Link>
                <span className={styles.breadcrumbSep}>›</span>
                <Link href="/ai-prompts">AI Prompts</Link>
                <span className={styles.breadcrumbSep}>›</span>
                <span className={styles.breadcrumbCurrent}>{cat.name}</span>
            </div>

            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <span className={styles.headerIcon}>{cat.icon}</span>
                        <h1 className={styles.title}>{cat.extended_content?.intro_heading || cat.name}</h1>

                        {cat.extended_content?.intro_text ? (
                            <div className={styles.richIntro}>
                                {cat.extended_content.intro_text.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.intro}>{cat.description}</p>
                        )}

                        <div className={styles.headerMeta}>
                            <span className={styles.metaBadge}>
                                📋 {categoryPrompts.length} Free Prompts
                            </span>
                            <span className={styles.metaBadge}>
                                🌍 {categoryPrompts[0]?.region || 'India/Global'}
                            </span>
                            {cat.extended_content?.eeat && (
                                <span className={styles.metaBadge}>
                                    📅 Updated: {cat.extended_content.eeat.last_updated}
                                </span>
                            )}
                            <span className={styles.metaBadge}>✅ Free to Copy</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Specialized Section */}
            {cat.extended_content?.why_specialized && (
                <section className={`section ${styles.whySpecialized}`}>
                    <div className="container">
                        <div className={styles.contentCard}>
                            <h2>{cat.extended_content.why_specialized.title}</h2>
                            <p>{cat.extended_content.why_specialized.content}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Usage Guide Section */}
            {cat.extended_content?.usage_guide && (
                <section className={`section ${styles.usageSection}`}>
                    <div className="container">
                        <div className={styles.usageCard}>
                            <h2>{cat.extended_content.usage_guide.title}</h2>
                            <div className={styles.stepGrid}>
                                {cat.extended_content.usage_guide.steps.map((step, i) => (
                                    <div key={i} className={styles.stepItem}>
                                        <span className={styles.stepNumber}>{i + 1}</span>
                                        <p>{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Prompt Cards with Filter */}
            <section className={`section ${styles.promptsSection}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Ready-to-Use {cat.name}</h2>
                        <p>Search, filter, and copy high-performance prompts instantly</p>
                    </div>
                    <PromptFilterSection
                        prompts={categoryPrompts}
                        categorySlug={categorySlug}
                        subCategories={subCategories}
                    />
                </div>
            </section>

            {/* FAQ Section */}
            {cat.faqs && cat.faqs.length > 0 && (
                <section className="section">
                    <div className="container">
                        <PromptFAQ faqs={cat.faqs} categoryName={cat.name} />
                    </div>
                </section>
            )}

            {/* Related Blog Posts */}
            {relatedBlogs.length > 0 && (
                <section className={`section ${styles.relatedBlogs}`}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Related AI Guides &amp; News</h2>
                        <div className={styles.blogGrid}>
                            {relatedBlogs.map(blog => (
                                <Link
                                    key={blog.slug}
                                    href={`/blog/${blog.slug}`}
                                    className={styles.blogCard}
                                >
                                    <img
                                        src={blog.cover_image_url}
                                        alt={blog.title}
                                        className={styles.blogImage}
                                    />
                                    <div className={styles.blogContent}>
                                        <span className={styles.blogCategory}>{blog.category}</span>
                                        <h3 className={styles.blogTitle}>{blog.title}</h3>
                                        <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Other Categories */}
            <section className={`section ${styles.otherCategories}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Explore More Prompt Categories</h2>
                        <p>Find prompts for every use case</p>
                    </div>
                    <div className={styles.otherGrid}>
                        {otherCategories.map(other => (
                            <Link
                                key={other.slug}
                                href={`/ai-prompts/${other.slug}`}
                                className={styles.otherCard}
                            >
                                <span className={styles.otherIcon}>{other.icon}</span>
                                <div>
                                    <h3 className={styles.otherName}>{other.name}</h3>
                                    <span className={styles.otherCount}>{other.prompt_count}+ prompts</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* EEAT Section */}
            {cat.extended_content?.eeat && (
                <section className={`section ${styles.eeatSection}`}>
                    <div className="container">
                        <div className={styles.eeatCard}>
                            <div className={styles.eeatContent}>
                                <h3>Who Created These Prompts?</h3>
                                <p>{cat.extended_content.eeat.curator}</p>
                                <div className={styles.editorialNote}>
                                    <strong>Editorial Note:</strong> {cat.extended_content.eeat.editorial_note}
                                </div>
                                <div className={styles.lastUpdated}>
                                    Last Updated: {cat.extended_content.eeat.last_updated} | Next Review: Quarterly
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Internal Links */}
            <section className={`section ${styles.internalLinks}`}>
                <div className="container">
                    <div className={styles.linksGrid}>
                        <Link href="/ai-prompts" className={styles.linkCard}>
                            ← Back to All Prompt Categories
                        </Link>
                        <Link href="/tools" className={styles.linkCard}>
                            🛠️ Explore AI Tools Directory
                        </Link>
                        <Link href="/blog" className={styles.linkCard}>
                            📰 Read Our AI Blog
                        </Link>
                        <Link href="/guides" className={styles.linkCard}>
                            📚 AI Guides &amp; How-Tos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
