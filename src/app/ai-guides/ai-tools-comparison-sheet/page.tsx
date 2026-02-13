import type { Metadata } from 'next';
import Link from 'next/link';
import PaymentButton from '@/components/PaymentButton';
import FAQ from '@/components/FAQ';
import styles from '../best-ai-tools-india/page.module.css';

export const metadata: Metadata = {
    title: 'AI Tools Comparison Sheet - Compare 50 AI Tools at a Glance',
    description: 'Detailed comparison spreadsheet of 50 popular AI tools with pricing in ₹, features, pros/cons, and recommendations.',
    keywords: ['AI tools comparison', 'AI tools spreadsheet', 'compare AI tools', 'AI tools India'],
};

const faqs = [
    {
        question: 'What format is the comparison sheet?',
        answer: 'You\'ll receive an editable Google Sheet that you can view, filter, and customize. You can also download it as Excel or CSV.'
    },
    {
        question: 'How many tools are included?',
        answer: '50 popular AI tools across all categories - writing, design, video, coding, research, productivity, and more.'
    },
    {
        question: 'Is the pricing in Indian Rupees?',
        answer: 'Yes! All pricing is converted to ₹ so you can easily compare costs for Indian users.'
    },
    {
        question: 'Can I get a refund?',
        answer: 'Yes! If you\'re not satisfied within 7 days, email us for a full refund. No questions asked.'
    },
    {
        question: 'Will this be updated?',
        answer: 'Yes, we update the sheet quarterly with new tools and pricing changes. You\'ll get free access to all updates.'
    }
];

export default function ComparisonSheetPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.heroGrid} />
                </div>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            📊 Comparison Sheet
                        </div>
                        <h1 className={styles.title}>
                            AI Tools Comparison Sheet (50 Tools)
                        </h1>
                        <p className={styles.subtitle}>
                            Compare features, pricing, and use cases at a glance. Make informed decisions
                            with our detailed side-by-side comparison of 50 popular AI tools.
                        </p>
                        <div className={styles.heroActions}>
                            <PaymentButton
                                productId="ai-tools-comparison-sheet"
                                productTitle="AI Tools Comparison Sheet (50 Tools)"
                                amount={199}
                                buttonText="Buy & Download Instantly"
                            />
                            <p className={styles.guarantee}>
                                ✅ 7-day money-back guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className={`section ${styles.problem}`}>
                <div className="container">
                    <div className={styles.problemContent}>
                        <h2>Stop Jumping Between Websites to Compare Tools</h2>
                        <div className={styles.problemGrid}>
                            <div className={styles.problemItem}>
                                <span className={styles.problemIcon}>😵</span>
                                <h3>Scattered Information</h3>
                                <p>Tool information is spread across multiple websites, reviews, and comparison sites.</p>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.problemIcon}>⏰</span>
                                <h3>Time-Consuming Research</h3>
                                <p>Spending hours researching and comparing features, pricing, and reviews.</p>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.problemIcon}>📊</span>
                                <h3>Hard to Compare</h3>
                                <p>No easy way to compare tools side-by-side with all the details you need.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className={`section ${styles.included}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>What's in the Comparison Sheet</h2>
                        <p>Everything you need to compare and choose the right AI tools</p>
                    </div>
                    <div className={styles.includedGrid}>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>50 AI Tools Compared</h3>
                                <p>All major AI tools across writing, design, video, coding, and more</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Pricing in ₹</h3>
                                <p>All pricing converted to Indian Rupees with monthly/yearly breakdowns</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Feature Comparison Matrix</h3>
                                <p>Side-by-side comparison of key features for each tool</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Pros and Cons</h3>
                                <p>Honest assessment of strengths and weaknesses for each tool</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Best Use Cases</h3>
                                <p>Recommendations for when to use each tool based on your needs</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Editable Google Sheet</h3>
                                <p>Filter, sort, and customize the sheet to fit your research needs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className={`section ${styles.pricing}`}>
                <div className="container">
                    <div className={styles.pricingCard}>
                        <div className={styles.pricingHeader}>
                            <h2>Get Instant Access</h2>
                            <p>One-time payment. Lifetime access. Quarterly updates.</p>
                        </div>
                        <div className={styles.pricingBody}>
                            <div className={styles.price}>
                                <span className={styles.priceAmount}>₹199</span>
                                <span className={styles.priceOriginal}>₹299</span>
                                <span className={styles.priceSave}>Save 33%</span>
                            </div>
                            <ul className={styles.pricingFeatures}>
                                <li>✓ 50 AI tools compared side-by-side</li>
                                <li>✓ All pricing in ₹</li>
                                <li>✓ Feature comparison matrix</li>
                                <li>✓ Pros and cons for each tool</li>
                                <li>✓ Best use cases and recommendations</li>
                                <li>✓ Editable Google Sheet format</li>
                                <li>✓ Quarterly updates</li>
                                <li>✓ 7-day money-back guarantee</li>
                            </ul>
                            <PaymentButton
                                productId="ai-tools-comparison-sheet"
                                productTitle="AI Tools Comparison Sheet (50 Tools)"
                                amount={199}
                                buttonText="Buy & Download Instantly"
                                className={styles.pricingCta}
                            />
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

            {/* Bundle Upsell */}
            <section className={styles.finalCta}>
                <div className="container">
                    <div className={styles.finalCtaCard}>
                        <h2>Want the Complete Package?</h2>
                        <p>Get both the Comparison Sheet AND the Best AI Tools Guide for just ₹499 (save ₹99)</p>
                        <Link href="/ai-guides/complete-ai-toolkit" className="btn btn-primary btn-lg">
                            View Complete Bundle →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
