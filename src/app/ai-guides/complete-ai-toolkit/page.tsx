import type { Metadata } from 'next';
import Link from 'next/link';
import PaymentButton from '@/components/PaymentButton';
import FAQ from '@/components/FAQ';
import styles from '../best-ai-tools-india/page.module.css';

export const metadata: Metadata = {
    title: 'Complete AI Toolkit Bundle - Best Value for AI Tool Researchers',
    description: 'Get both the Best AI Tools Guide and Comparison Sheet together. Save ₹99 with this bundle deal.',
    keywords: ['AI tools bundle', 'AI tools package', 'AI buying guide bundle', 'best AI tools deal'],
};

const faqs = [
    {
        question: 'What\'s included in the bundle?',
        answer: 'You get both the Best AI Tools for Students & Creators Guide (₹399 value) AND the AI Tools Comparison Sheet (₹199 value) for just ₹499. That\'s a ₹99 savings!'
    },
    {
        question: 'How do I access both products?',
        answer: 'After purchase, you\'ll get immediate download links for both the PDF guide and the Google Sheet. We\'ll also email you permanent access links.'
    },
    {
        question: 'Do I get updates for both?',
        answer: 'Yes! You get free updates for 1 year on the guide and quarterly updates on the comparison sheet.'
    },
    {
        question: 'Can I buy them separately later?',
        answer: 'Yes, but you\'ll pay ₹598 total. The bundle saves you ₹99, so it\'s the best value if you want both.'
    },
    {
        question: 'Is there a money-back guarantee?',
        answer: 'Absolutely! 7-day money-back guarantee. If you\'re not satisfied, email us for a full refund.'
    }
];

export default function CompleteBundlePage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            🎁 Best Value Bundle
                        </div>
                        <h1 className={styles.title}>
                            Complete AI Toolkit Bundle
                        </h1>
                        <p className={styles.subtitle}>
                            Get everything you need to choose the right AI tools. Includes the comprehensive
                            guide AND the comparison sheet. Save ₹99 when you buy together.
                        </p>
                        <div className={styles.heroActions}>
                            <PaymentButton
                                productId="complete-ai-toolkit"
                                productTitle="Complete AI Toolkit Bundle"
                                amount={499}
                                buttonText="Buy Bundle & Save ₹99"
                            />
                            <p className={styles.guarantee}>
                                ✅ 7-day money-back guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className={`section ${styles.included}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>What's Included in the Bundle</h2>
                        <p>Two powerful resources for the price of one</p>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
                        {/* Product 1 */}
                        <div style={{
                            background: 'white',
                            border: '2px solid #3b82f6',
                            borderRadius: '16px',
                            padding: '2rem',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '2rem' }}>📚</span>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                                        Best AI Tools for Students & Creators Guide
                                    </h3>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>₹399 value</p>
                                </div>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0 0' }}>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ 35-page comprehensive guide</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ 50+ AI tools reviewed</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Category-wise recommendations</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Step-by-step setup guides</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Real use cases for students & creators</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Free updates for 1 year</li>
                            </ul>
                        </div>

                        {/* Product 2 */}
                        <div style={{
                            background: 'white',
                            border: '2px solid #8b5cf6',
                            borderRadius: '16px',
                            padding: '2rem',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '2rem' }}>📊</span>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                                        AI Tools Comparison Sheet
                                    </h3>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>₹199 value</p>
                                </div>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0 0' }}>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ 50 tools compared side-by-side</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Feature comparison matrix</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Pricing in ₹</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Pros and cons for each tool</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Editable Google Sheet format</li>
                                <li style={{ padding: '0.5rem 0', color: '#374151' }}>✓ Quarterly updates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className={`section ${styles.pricing}`}>
                <div className="container">
                    <div className={styles.pricingCard}>
                        <div className={styles.pricingHeader}>
                            <h2>Bundle Pricing - Best Value</h2>
                            <p>Get both products and save ₹99</p>
                        </div>
                        <div className={styles.pricingBody}>
                            <div className={styles.price}>
                                <span className={styles.priceAmount}>₹499</span>
                                <span className={styles.priceOriginal}>₹598</span>
                                <span className={styles.priceSave}>Save ₹99</span>
                            </div>

                            <div style={{
                                background: '#f0fdf4',
                                border: '1px solid #86efac',
                                borderRadius: '8px',
                                padding: '1rem',
                                margin: '1.5rem 0',
                                textAlign: 'center',
                            }}>
                                <p style={{ margin: 0, color: '#047857', fontWeight: '600' }}>
                                    💰 You save ₹99 compared to buying separately!
                                </p>
                            </div>

                            <ul className={styles.pricingFeatures}>
                                <li>✓ Best AI Tools Guide (₹399 value)</li>
                                <li>✓ AI Tools Comparison Sheet (₹199 value)</li>
                                <li>✓ All pricing in ₹</li>
                                <li>✓ Lifetime access to both</li>
                                <li>✓ Free updates for 1 year</li>
                                <li>✓ Instant download for both products</li>
                                <li>✓ 7-day money-back guarantee</li>
                            </ul>
                            <PaymentButton
                                productId="complete-ai-toolkit"
                                productTitle="Complete AI Toolkit Bundle"
                                amount={499}
                                buttonText="Buy Bundle & Save ₹99"
                                className={styles.pricingCta}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Bundle */}
            <section className={`section ${styles.whoFor}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Why Get the Bundle?</h2>
                    </div>
                    <div className={styles.whoGrid}>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>💰</span>
                            <h3>Save Money</h3>
                            <p>Get both products for ₹499 instead of ₹598. That's ₹99 in savings!</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>📚</span>
                            <h3>Complete Research</h3>
                            <p>The guide gives you detailed insights, the sheet lets you compare at a glance.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>⚡</span>
                            <h3>Make Better Decisions</h3>
                            <p>Use both resources together to make the most informed decisions about AI tools.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>🎯</span>
                            <h3>Best Value</h3>
                            <p>If you're serious about choosing the right AI tools, this bundle is the best investment.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`section ${styles.faq}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className={styles.faqContent}>
                        <FAQ items={faqs} />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className="container">
                    <div className={styles.finalCtaCard}>
                        <h2>Ready to Get the Complete Toolkit?</h2>
                        <p>Join hundreds of students, creators, and freelancers making smarter AI tool decisions.</p>
                        <PaymentButton
                            productId="complete-ai-toolkit"
                            productTitle="Complete AI Toolkit Bundle"
                            amount={499}
                            buttonText="Buy Bundle & Save ₹99"
                        />
                        <p className={styles.finalCtaGuarantee}>
                            ✅ 7-day money-back guarantee • 🔒 Secure payment via Razorpay
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
