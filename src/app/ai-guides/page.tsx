import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';
import { products } from '@/data/products';

export const metadata: Metadata = {
    title: 'Premium AI Guides',
    description: 'Choose the right AI tools without wasting money. India-focused, practical guides updated yearly.',
    keywords: ['AI guides', 'AI tools India', 'AI buying guide', 'best AI tools', 'AI comparison'],
};

export default function AIGuidesPage() {
    const guides = products.filter(p => p.product_type !== 'bundle');
    const bundles = products.filter(p => p.product_type === 'bundle');

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

            {/* Individual Guides Section */}
            <section className="section" id="guides">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className="section-title">Individual Guides & Reports</h2>
                        <p className="section-subtitle">Practical playbooks for specific goals</p>
                    </div>
                    <div className={styles.productsGrid}>
                        {guides.map((product) => (
                            <ProductCard
                                key={product.slug}
                                product={product}
                                featured={false}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Bundles Section */}
            <section className="section" id="bundles" style={{ background: 'var(--bg-secondary)', padding: '4rem 0' }}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className="section-title">Value Bundles</h2>
                        <p className="section-subtitle">Save up to 50% with our curated bundles</p>
                    </div>
                    <div className={styles.productsGrid}>
                        {bundles.map((product) => (
                            <ProductCard
                                key={product.slug}
                                product={product}
                                featured={true}
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
