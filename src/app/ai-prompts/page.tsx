import Link from 'next/link';
import type { Metadata } from 'next';
import { promptCategories } from '@/data/prompt-data';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'AI Prompt Library – Free Prompts for Work, Marketing & More',
    description: 'Browse 30+ free AI prompts for work, marketing, students, HR, content writing & Indian business. Copy & paste into ChatGPT, Gemini & more.',
    openGraph: {
        title: 'AI Prompt Library – Free AI Prompts | AIBrainX',
        description: 'Browse 30+ free AI prompts for work, marketing, students, HR, content writing & Indian business.',
        type: 'website',
        url: 'https://aibrainx.in/ai-prompts',
    },
};

export default function AIPromptsPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.heroGrid} />
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <div className={styles.heroBadge}>
                        <span>💡</span> Free AI Prompt Library
                    </div>
                    <h1 className={styles.heroTitle}>
                        AI Prompts for
                        <span className={styles.heroGradient}> Every Need</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Browse high-quality, ready-to-use AI prompts for work, marketing, students,
                        HR, content writing, and Indian business. Just copy, paste, and go.
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>30+</span>
                            <span className={styles.statLabel}>Prompts</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>6</span>
                            <span className={styles.statLabel}>Categories</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Free</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className={`section ${styles.categoriesSection}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Browse Prompt Categories</h2>
                        <p>Choose a category to find the perfect AI prompt for your use case</p>
                    </div>
                    <div className={styles.categoriesGrid}>
                        {promptCategories.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/ai-prompts/${cat.slug}`}
                                className={styles.categoryCard}
                            >
                                <div className={styles.categoryIconWrap}>
                                    <span className={styles.categoryIcon}>{cat.icon}</span>
                                </div>
                                <div className={styles.categoryInfo}>
                                    <h3 className={styles.categoryName}>{cat.name}</h3>
                                    <p className={styles.categoryDesc}>
                                        {cat.description.substring(0, 120)}...
                                    </p>
                                    <div className={styles.categoryMeta}>
                                        <span className={styles.promptCount}>
                                            {cat.prompt_count} prompts
                                        </span>
                                        <span className={styles.viewLink}>
                                            View Prompts →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className={`section ${styles.howItWorks}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>How to Use AI Prompts</h2>
                        <p>Get started in 3 simple steps</p>
                    </div>
                    <div className={styles.stepsGrid}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h3>Browse & Choose</h3>
                            <p>Explore categories and find the prompt that matches your need.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h3>Copy the Prompt</h3>
                            <p>Click "Copy Prompt" to copy it to your clipboard instantly.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h3>Paste & Generate</h3>
                            <p>Paste the prompt into ChatGPT, Gemini, or any AI tool and get results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Links */}
            <section className={`section ${styles.relatedSection}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Explore More from AIBrainX</h2>
                    </div>
                    <div className={styles.relatedGrid}>
                        <Link href="/tools" className={styles.relatedCard}>
                            <span className={styles.relatedIcon}>🛠️</span>
                            <h3>AI Tools Directory</h3>
                            <p>Discover 500+ AI tools with Indian pricing and reviews.</p>
                        </Link>
                        <Link href="/blog" className={styles.relatedCard}>
                            <span className={styles.relatedIcon}>📰</span>
                            <h3>AI Blog</h3>
                            <p>Daily AI insights, tutorials, and comparisons.</p>
                        </Link>
                        <Link href="/ai-guides" className={styles.relatedCard}>
                            <span className={styles.relatedIcon}>📚</span>
                            <h3>AI Guides</h3>
                            <p>Premium guides to master AI tools for your workflow.</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
