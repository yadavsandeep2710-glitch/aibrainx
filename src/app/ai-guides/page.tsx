import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Premium AI Guides',
    description: 'Choose the right AI tools without wasting money. India-focused, practical guides updated yearly.',
    keywords: ['AI guides', 'AI tools India', 'AI buying guide', 'best AI tools', 'AI comparison'],
};

// Mock products data - in production, fetch from Supabase
const products = [
    {
        slug: 'best-ai-tools-india',
        title: 'Best AI Tools for Students & Creators in India (2026)',
        subtitle: 'India-focused, practical, updated yearly',
        description: 'Stop wasting money on wrong AI tools. Get expert recommendations for students, creators, and freelancers with pricing in ₹.',
        price_inr: 399,
        original_price_inr: 599,
        product_type: 'guide' as const,
        features: [
            '50+ AI tools reviewed and compared',
            'Pricing in ₹ for Indian users',
            'Category-wise recommendations',
            'Free vs Paid comparisons',
            'Step-by-step setup guides',
            'Real use cases for students & creators',
            'Monthly updates for 1 year'
        ]
    },
    {
        slug: 'ai-tools-comparison-sheet',
        title: 'AI Tools Comparison Sheet (50 Tools)',
        subtitle: 'Compare features, pricing, and use cases at a glance',
        description: 'A detailed comparison spreadsheet of 50 popular AI tools with pricing, features, pros/cons, and recommendations.',
        price_inr: 199,
        original_price_inr: 299,
        product_type: 'sheet' as const,
        features: [
            '50 AI tools compared side-by-side',
            'Pricing in ₹',
            'Feature comparison matrix',
            'Pros and cons for each tool',
            'Best use cases',
            'Editable Google Sheet format'
        ]
    },
    {
        slug: 'complete-ai-toolkit',
        title: 'Complete AI Toolkit Bundle',
        subtitle: 'Get both the guide and comparison sheet',
        description: 'Save ₹99 when you buy both products together. Perfect for serious AI tool researchers.',
        price_inr: 499,
        original_price_inr: 598,
        product_type: 'bundle' as const,
        features: [
            'Best AI Tools Guide (₹399 value)',
            'AI Tools Comparison Sheet (₹199 value)',
            'Lifetime access to both',
            'Free updates for 1 year',
            'Save ₹99'
        ]
    }
];

export default function AIGuidesPage() {
    return (
        <div className={styles.page}>
            {/* Compact Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.heroOrb3} />
                    <div className={styles.heroGrid} />
                </div>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            <span>📚</span> Premium AI Guides
                        </div>
                        <h1 className={styles.title}>
                            Choose the Right AI Tools <br />
                            <span className={styles.gradient}>Without Wasting Money</span>
                        </h1>
                        <p className={styles.subtitle}>
                            India-focused, practical guides. Updated yearly with pricing in ₹.
                        </p>

                        {/* Key Stats Inline */}
                        <div className={styles.heroStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>50+</span>
                                <span className={styles.statLabel}>Tools</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>₹ INR</span>
                                <span className={styles.statLabel}>Pricing</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>1 Year</span>
                                <span className={styles.statLabel}>Updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Combined Products Section */}
            <section className="section" id="guides">
                <div className="container">
                    <div className={styles.productsGrid}>
                        {products.map((product) => (
                            <ProductCard
                                key={product.slug}
                                product={product}
                                featured={true} // Highlight all products for consistent design
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Combined Info Section (Split Layout) */}
            <section className={`section ${styles.infoSection}`}>
                <div className="container">
                    <div className={styles.splitGrid}>
                        {/* Benefits Column */}
                        <div className={styles.infoColumn}>
                            <h2 className={styles.columnTitle}>Why Our Guides?</h2>
                            <div className={styles.compactList}>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>🇮🇳</span>
                                    <div>
                                        <h3>Made for India</h3>
                                        <p>Pricing in ₹ & local context.</p>
                                    </div>
                                </div>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>💰</span>
                                    <div>
                                        <h3>Save Money</h3>
                                        <p>Avoid useless subscriptions.</p>
                                    </div>
                                </div>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>⏱️</span>
                                    <div>
                                        <h3>Save Time</h3>
                                        <p>Curated comparisons.</p>
                                    </div>
                                </div>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>🔄</span>
                                    <div>
                                        <h3>Always Updated</h3>
                                        <p>Free updates for 1 year.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Audience Column */}
                        <div className={styles.infoColumn}>
                            <h2 className={styles.columnTitle}>Who is this for?</h2>
                            <div className={styles.compactList}>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>🎓</span>
                                    <div>
                                        <h3>Students</h3>
                                        <p>Research & learning tools.</p>
                                    </div>
                                </div>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>🎨</span>
                                    <div>
                                        <h3>Creators</h3>
                                        <p>Content creation & editing.</p>
                                    </div>
                                </div>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>💼</span>
                                    <div>
                                        <h3>Freelancers</h3>
                                        <p>Productivity & niche tools.</p>
                                    </div>
                                </div>
                                <div className={styles.compactItem}>
                                    <span className={styles.compactIcon}>🚀</span>
                                    <div>
                                        <h3>Small Businesses</h3>
                                        <p>Marketing & operations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compact Footer: Refund + Free Guide */}
            <section className={styles.compactFooter}>
                <div className="container">
                    <div className={styles.footerGrid}>
                        <div className={styles.refundBox}>
                            <span className={styles.refundIcon}>✅</span>
                            <span>7-Day Money-Back Guarantee</span>
                        </div>
                        <div className={styles.freeBox}>
                            <span>Not ready? </span>
                            <Link href="/free-ai-guide" className={styles.link}>
                                Get Free Starter Guide →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
