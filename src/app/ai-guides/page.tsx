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
    const mainProduct = products[0];
    const otherProducts = products.slice(1);

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
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
                            India-focused, practical guides that help you pick the perfect AI tools for your needs.
                            Updated yearly with the latest tools and pricing in ₹.
                        </p>
                        <div className={styles.heroStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>50+</span>
                                <span className={styles.statLabel}>Tools Reviewed</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>₹ INR</span>
                                <span className={styles.statLabel}>Pricing</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>1 Year</span>
                                <span className={styles.statLabel}>Free Updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product */}
            <section className={`section ${styles.featured}`}>
                <div className="container">
                    <div className={styles.featuredLabel}>
                        ⭐ Most Popular
                    </div>
                    <div className={styles.featuredGrid}>
                        <ProductCard product={mainProduct} featured={true} />
                    </div>
                </div>
            </section>

            {/* Other Products */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>More Products</h2>
                        <p>Additional resources to help you choose the right AI tools</p>
                    </div>
                    <div className={styles.productsGrid}>
                        {otherProducts.map((product) => (
                            <ProductCard key={product.slug} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={`section ${styles.benefits}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Why Our Guides?</h2>
                        <p>What makes our AI guides different</p>
                    </div>
                    <div className={styles.benefitsGrid}>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🇮🇳</span>
                            <h3>Made for India</h3>
                            <p>All pricing in ₹, tools that work in India, and recommendations for Indian users.</p>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>💰</span>
                            <h3>Save Money</h3>
                            <p>Stop wasting money on tools you don't need. Get expert recommendations based on your use case.</p>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>⏱️</span>
                            <h3>Save Time</h3>
                            <p>No more endless research. We've done the work for you with detailed comparisons and reviews.</p>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🔄</span>
                            <h3>Always Updated</h3>
                            <p>Get free updates for 1 year as new tools launch and pricing changes.</p>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>✅</span>
                            <h3>Practical & Actionable</h3>
                            <p>Step-by-step guides, real use cases, and clear recommendations you can implement today.</p>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🎯</span>
                            <h3>For Your Needs</h3>
                            <p>Whether you're a student, creator, freelancer, or business owner, we have recommendations for you.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who It's For */}
            <section className={`section ${styles.whoSection}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Who Are These Guides For?</h2>
                    </div>
                    <div className={styles.whoGrid}>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>🎓</span>
                            <h3>Students</h3>
                            <p>Boost your productivity and ace your assignments with the right AI tools for research, writing, and learning.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>🎨</span>
                            <h3>Content Creators</h3>
                            <p>Create better content faster with AI tools for video editing, design, writing, and social media.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>💼</span>
                            <h3>Freelancers</h3>
                            <p>Work smarter and deliver better results with AI tools for your specific freelance niche.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>🚀</span>
                            <h3>Small Businesses</h3>
                            <p>Grow your business with affordable AI tools for marketing, customer service, and operations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Refund Note */}
            <section className={styles.refund}>
                <div className="container">
                    <div className={styles.refundCard}>
                        <span className={styles.refundIcon}>✅</span>
                        <div>
                            <h3>7-Day Money-Back Guarantee</h3>
                            <p>Not satisfied? Get a full refund within 7 days. No questions asked.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Free Guide CTA */}
            <section className={`section ${styles.freeCta}`}>
                <div className="container">
                    <div className={styles.freeCard}>
                        <h2>Not Ready to Buy?</h2>
                        <p>Get our free guide: "Top 25 Free AI Tools for Students & Creators"</p>
                        <Link href="/free-ai-guide" className="btn btn-secondary btn-lg">
                            Get Free Guide →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
