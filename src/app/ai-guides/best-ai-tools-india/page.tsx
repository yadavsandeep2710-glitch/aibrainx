import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PaymentButton from '@/components/PaymentButton';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Best AI Tools for Students & Creators in India (2026)',
    description: 'Stop wasting money on wrong AI tools. Get expert recommendations with pricing in ₹, comparisons, and step-by-step guides.',
    keywords: ['best AI tools India', 'AI tools for students', 'AI tools for creators', 'AI buying guide'],
};

const faqs = [
    {
        question: 'Is this guide updated regularly?',
        answer: 'Yes! You get free updates for 1 year. We update the guide every quarter with new tools and pricing changes.'
    },
    {
        question: 'What format is the guide in?',
        answer: 'You\'ll receive a PDF file that works on any device. It\'s designed to be easy to read on mobile, tablet, or desktop.'
    },
    {
        question: 'Can I get a refund?',
        answer: 'Yes! If you\'re not satisfied within 7 days, email us for a full refund. No questions asked.'
    },
    {
        question: 'Is the pricing really in Indian Rupees?',
        answer: 'Absolutely! All tools are priced in ₹ and we focus on tools that work well for Indian users and accept Indian payment methods.'
    },
    {
        question: 'How do I access the guide after purchase?',
        answer: 'Immediately after payment, you\'ll get a download link. We\'ll also email you a permanent access link.'
    }
];

export default function BestAIToolsIndiaPage() {
    return (
        <div className={styles.page}>
            {/* Hero / Problem Statement */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            📚 Premium Guide
                        </div>
                        <h1 className={styles.title}>
                            Best AI Tools for Students & Creators in India (2026)
                        </h1>
                        <p className={styles.subtitle}>
                            Stop wasting money on the wrong AI tools. Get expert recommendations
                            with pricing in ₹, detailed comparisons, and step-by-step setup guides.
                        </p>
                        <div className={styles.heroActions}>
                            <PaymentButton
                                productId="best-ai-tools-india"
                                productTitle="Best AI Tools for Students & Creators in India (2026)"
                                amount={399}
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
                        <h2>The Problem: Too Many AI Tools, Too Much Confusion</h2>
                        <div className={styles.problemGrid}>
                            <div className={styles.problemItem}>
                                <span className={styles.problemIcon}>😵</span>
                                <h3>1000+ New Tools Every Month</h3>
                                <p>With so many AI tools launching daily, how do you know which ones are worth your time and money?</p>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.problemIcon}>💸</span>
                                <h3>Wasted Money on Wrong Tools</h3>
                                <p>Most people subscribe to tools they never use or pick the wrong tool for their specific needs.</p>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.problemIcon}>⏰</span>
                                <h3>Hours of Research Wasted</h3>
                                <p>Endless YouTube videos, blog posts, and reviews that still leave you confused about what to choose.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className={`section ${styles.included}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>What's Inside This Guide</h2>
                        <p>Everything you need to choose the right AI tools</p>
                    </div>
                    <div className={styles.includedGrid}>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>50+ AI Tools Reviewed</h3>
                                <p>Detailed reviews of the most popular AI tools across all categories</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Pricing in ₹</h3>
                                <p>All pricing converted to Indian Rupees with payment method compatibility</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Category-wise Recommendations</h3>
                                <p>Best tools for writing, design, video, coding, research, and more</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Free vs Paid Comparisons</h3>
                                <p>Know exactly when to use free tools and when paid tools are worth it</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Step-by-Step Setup Guides</h3>
                                <p>Easy tutorials to get started with each recommended tool</p>
                            </div>
                        </div>
                        <div className={styles.includedItem}>
                            <span className={styles.includedIcon}>✓</span>
                            <div>
                                <h3>Real Use Cases</h3>
                                <p>Practical examples for students, creators, freelancers, and businesses</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who It's For */}
            <section className={`section ${styles.whoFor}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Who Is This Guide For?</h2>
                    </div>
                    <div className={styles.whoGrid}>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>🎓</span>
                            <h3>Students</h3>
                            <p>Looking to boost productivity, ace assignments, and learn faster with AI tools for research, writing, and studying.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>🎨</span>
                            <h3>Content Creators</h3>
                            <p>YouTubers, bloggers, and social media creators who want to create better content faster with AI.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>💼</span>
                            <h3>Freelancers</h3>
                            <p>Designers, writers, developers, and marketers who want to work smarter and deliver better results.</p>
                        </div>
                        <div className={styles.whoCard}>
                            <span className={styles.whoIcon}>🚀</span>
                            <h3>Small Business Owners</h3>
                            <p>Entrepreneurs who want to leverage AI for marketing, customer service, and operations without breaking the bank.</p>
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
                            <p>One-time payment. Lifetime access. Free updates for 1 year.</p>
                        </div>
                        <div className={styles.pricingBody}>
                            <div className={styles.price}>
                                <span className={styles.priceAmount}>₹399</span>
                                <span className={styles.priceOriginal}>₹599</span>
                                <span className={styles.priceSave}>Save 33%</span>
                            </div>
                            <ul className={styles.pricingFeatures}>
                                <li>✓ 35-page comprehensive guide</li>
                                <li>✓ 50+ AI tools reviewed</li>
                                <li>✓ All pricing in ₹</li>
                                <li>✓ Category-wise recommendations</li>
                                <li>✓ Step-by-step setup guides</li>
                                <li>✓ Free updates for 1 year</li>
                                <li>✓ 7-day money-back guarantee</li>
                            </ul>
                            <PaymentButton
                                productId="best-ai-tools-india"
                                productTitle="Best AI Tools for Students & Creators in India (2026)"
                                amount={399}
                                buttonText="Buy & Download Instantly"
                                className={styles.pricingCta}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className={`section ${styles.testimonials}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>What People Are Saying</h2>
                    </div>
                    <div className={styles.testimonialsGrid}>
                        <div className={styles.testimonial}>
                            <div className={styles.testimonialRating}>⭐⭐⭐⭐⭐</div>
                            <p className={styles.testimonialText}>
                                "This guide saved me so much time! I was overwhelmed by all the AI tools out there.
                                Now I know exactly which ones to use for my YouTube channel."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <strong>Priya Sharma</strong>
                                <span>Content Creator, Mumbai</span>
                            </div>
                        </div>
                        <div className={styles.testimonial}>
                            <div className={styles.testimonialRating}>⭐⭐⭐⭐⭐</div>
                            <p className={styles.testimonialText}>
                                "Finally, a guide with pricing in rupees! The comparisons are super helpful and
                                the recommendations are spot-on for students."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <strong>Rahul Verma</strong>
                                <span>Engineering Student, Bangalore</span>
                            </div>
                        </div>
                        <div className={styles.testimonial}>
                            <div className={styles.testimonialRating}>⭐⭐⭐⭐</div>
                            <p className={styles.testimonialText}>
                                "Worth every rupee. The guide helped me choose the right design tools and I'm
                                already saving money by avoiding unnecessary subscriptions."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <strong>Anjali Patel</strong>
                                <span>Freelance Designer, Ahmedabad</span>
                            </div>
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
                        <h2>Ready to Choose the Right AI Tools?</h2>
                        <p>Join hundreds of students, creators, and freelancers who are using AI tools smarter.</p>
                        <PaymentButton
                            productId="best-ai-tools-india"
                            productTitle="Best AI Tools for Students & Creators in India (2026)"
                            amount={399}
                            buttonText="Buy & Download Instantly"
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
