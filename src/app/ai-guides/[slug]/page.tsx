import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PaymentButton from '@/components/PaymentButton';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';
import { products } from '@/data/products';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.title,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            type: 'website',
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    // Default FAQs if not provided (keeping the ones from the original page as fallback or standard)
    const defaultFaqs = [
        {
            question: 'Is this guide updated regularly?',
            answer: 'Yes! You get free updates for 1 year. We update the guide every quarter with new tools and pricing changes.'
        },
        {
            question: 'What format is the guide in?',
            answer: "You'll receive a PDF file that works on any device. It's designed to be easy to read on mobile, tablet, or desktop."
        },
        {
            question: 'Can I get a refund?',
            answer: "Yes! If you're not satisfied within 7 days, email us for a full refund. No questions asked."
        },
        {
            question: 'Is the pricing really in Indian Rupees?',
            answer: 'Absolutely! All tools are priced in ₹ and we focus on tools that work well for Indian users and accept Indian payment methods.'
        },
        {
            question: 'How do I access the guide after purchase?',
            answer: "Immediately after payment, you'll get a download link. We'll also email you a permanent access link."
        }
    ];

    const displayFaqs = product.faqs || defaultFaqs;

    return (
        <div className={styles.page}>
            {/* Hero / Problem Statement */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.heroGrid} />
                </div>
                <div className="container">
                    <div className={styles.heroContent}>
                        {product.hero_badge && (
                            <div className={styles.badge}>
                                {product.hero_badge}
                            </div>
                        )}
                        <h1 className={styles.title}>
                            {product.title}
                        </h1>
                        <p className={styles.subtitle}>
                            {product.subtitle || product.description}
                        </p>
                        <div className={styles.heroActions}>
                            <PaymentButton
                                productId={product.slug}
                                productTitle={product.title}
                                amount={product.price_inr}
                                buttonText="Buy & Download Instantly"
                            />
                            <p className={styles.guarantee}>
                                ✅ 7-day money-back guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement - Only render if data exists */}
            {product.problem_items && product.problem_items.length > 0 && (
                <section className={`section ${styles.problem}`}>
                    <div className="container">
                        <div className={styles.problemContent}>
                            <h2>{product.problem_title || 'The Problem'}</h2>
                            <div className={styles.problemGrid}>
                                {product.problem_items.map((item, index) => (
                                    <div key={index} className={styles.problemItem}>
                                        <span className={styles.problemIcon}>{item.icon}</span>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* What's Included - Only render if data exists */}
            {product.whats_inside_items && product.whats_inside_items.length > 0 && (
                <section className={`section ${styles.included}`}>
                    <div className="container">
                        <div className="section-header">
                            <h2>What's Inside This Guide</h2>
                            <p>Everything you need to succeed</p>
                        </div>
                        <div className={styles.includedGrid}>
                            {product.whats_inside_items.map((item, index) => (
                                <div key={index} className={styles.includedItem}>
                                    <span className={styles.includedIcon}>{item.icon}</span>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Who It's For - Only render if data exists */}
            {product.who_is_for_items && product.who_is_for_items.length > 0 && (
                <section className={`section ${styles.whoFor}`}>
                    <div className="container">
                        <div className="section-header">
                            <h2>Who Is This Guide For?</h2>
                        </div>
                        <div className={styles.whoGrid}>
                            {product.who_is_for_items.map((item, index) => (
                                <div key={index} className={styles.whoCard}>
                                    <span className={styles.whoIcon}>{item.icon}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing */}
            <section className={`section ${styles.pricing}`}>
                <div className="container">
                    <div className={styles.pricingCard}>
                        <div className={styles.pricingHeader}>
                            <h2>Get Instant Access</h2>
                            <p>One-time payment. Lifetime access. Free updates.</p>
                        </div>
                        <div className={styles.pricingBody}>
                            <div className={styles.price}>
                                <span className={styles.priceAmount}>₹{product.price_inr}</span>
                                {product.original_price_inr && (
                                    <>
                                        <span className={styles.priceOriginal}>₹{product.original_price_inr}</span>
                                        <span className={styles.priceSave}>
                                            Save {Math.round(((product.original_price_inr - product.price_inr) / product.original_price_inr) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>
                            <ul className={styles.pricingFeatures}>
                                {product.features.map((feature, index) => (
                                    <li key={index}>✓ {feature}</li>
                                ))}
                                <li>✓ Lifetime access</li>
                                <li>✓ 7-day money-back guarantee</li>
                            </ul>
                            <PaymentButton
                                productId={product.slug}
                                productTitle={product.title}
                                amount={product.price_inr}
                                buttonText="Buy & Download Instantly"
                                className={styles.pricingCta}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Only render if data exists */}
            {product.testimonials && product.testimonials.length > 0 && (
                <section className={`section ${styles.testimonials}`}>
                    <div className="container">
                        <div className="section-header">
                            <h2>What People Are Saying</h2>
                        </div>
                        <div className={styles.testimonialsGrid}>
                            {product.testimonials.map((t, index) => (
                                <div key={index} className={styles.testimonial}>
                                    <div className={styles.testimonialRating}>{'⭐'.repeat(t.rating)}</div>
                                    <p className={styles.testimonialText}>
                                        "{t.text}"
                                    </p>
                                    <div className={styles.testimonialAuthor}>
                                        <strong>{t.author}</strong>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            <section className={`section ${styles.faq}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className={styles.faqContent}>
                        <FAQ items={displayFaqs} />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className="container">
                    <div className={styles.finalCtaCard}>
                        <h2>Ready to Get Started?</h2>
                        <p>Join hundreds of others who are leveling up their AI game.</p>
                        <PaymentButton
                            productId={product.slug}
                            productTitle={product.title}
                            amount={product.price_inr}
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
