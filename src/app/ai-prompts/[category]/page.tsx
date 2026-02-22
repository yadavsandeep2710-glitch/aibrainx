import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { promptCategories, getPromptsByCategory, getPromptCategory, getAllCategorySlugs } from '@/data/prompt-data';
import PromptCard from '@/components/PromptCard';
import PromptFAQ from '@/components/PromptFAQ';
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
        openGraph: {
            title: cat.meta_title,
            description: cat.meta_description,
            type: 'article',
            url: `https://aibrainx.in/ai-prompts/${cat.slug}`,
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

    // JSON-LD Article Schema
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
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

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
                        <h1 className={styles.title}>{cat.name}</h1>
                        <p className={styles.intro}>{cat.description}</p>
                        <div className={styles.headerMeta}>
                            <span className={styles.metaBadge}>
                                📋 {categoryPrompts.length} Free Prompts
                            </span>
                            <span className={styles.metaBadge}>
                                🌍 {categoryPrompts[0]?.region || 'India/Global'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prompt Cards */}
            <section className={`section ${styles.promptsSection}`}>
                <div className="container">
                    <div className={styles.promptsGrid}>
                        {categoryPrompts.map(prompt => (
                            <PromptCard key={prompt.id} prompt={prompt} />
                        ))}
                    </div>
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
                                    <span className={styles.otherCount}>{other.prompt_count} prompts</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

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
                    </div>
                </div>
            </section>
        </div>
    );
}
