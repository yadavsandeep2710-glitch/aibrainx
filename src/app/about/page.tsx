import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'About AIBrainX.in — India\'s #1 AI Tools Directory',
    description: 'Learn about AIBrainX.in, India\'s most trusted AI tools directory. Our mission to make AI accessible to every Indian.',
};

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Empowering India with the <span className={styles.gradientText}>Power of AI</span></h1>
                        <p className={styles.heroSubtitle}>
                            India&apos;s most trusted directory for human-curated AI tools,
                            tailored for the modern Indian professional.
                        </p>
                    </div>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Mission Section */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionLabel}>OUR MISSION</h2>
                            <h3 className={styles.sectionTitle}>Democratizing Artificial Intelligence</h3>
                        </div>
                        <div className={styles.missionGrid}>
                            <div className={styles.missionText}>
                                <p>
                                    AIBrainX.in was born from a simple observation: while AI tools are transforming how the world works,
                                    Indian users often struggle to find reliable information that matters to them.
                                </p>
                                <p>
                                    We bridge the gap between global AI innovation and Indian needs by providing
                                    manually curated listings, INR pricing, and context-aware reviews.
                                </p>
                            </div>
                            <div className={styles.statsCard}>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>500+</span>
                                    <span className={styles.statLabel}>Curated Tools</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>15+</span>
                                    <span className={styles.statLabel}>Categories</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>10k+</span>
                                    <span className={styles.statLabel}>Monthly Users</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What We Offer - Core Values */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionLabel}>WHY CHOOSE US</h2>
                            <h3 className={styles.sectionTitle}>Built for the Indian Ecosystem</h3>
                        </div>
                        <div className={styles.offerGrid}>
                            <div className={styles.offerCard}>
                                <div className={styles.offerIcon}>🔍</div>
                                <h4>Expert Curation</h4>
                                <p>We don&apos;t just list tools; we test them. Every entry is manually reviewed for quality and utility.</p>
                            </div>
                            <div className={styles.offerCard}>
                                <div className={styles.offerIcon}>💰</div>
                                <h4>Local Pricing</h4>
                                <p>No more currency conversion math. We provide clear pricing details in Indian Rupees (₹).</p>
                            </div>
                            <div className={styles.offerCard}>
                                <div className={styles.offerIcon}>🛡️</div>
                                <h4>Trust First</h4>
                                <p>Unbiased reviews from real Indian users helping you make informed decisions for your workflow.</p>
                            </div>
                            <div className={styles.offerCard}>
                                <div className={styles.offerIcon}>🚀</div>
                                <h4>Growth Driven</h4>
                                <p>Empowering Indian students, freelancers, and businesses to stay ahead in the AI era.</p>
                            </div>
                        </div>
                    </section>

                    {/* Problem/Solution - The Gap */}
                    <section className={styles.gapSection}>
                        <div className={styles.gapContent}>
                            <h3>The Indian AI Gap</h3>
                            <p>
                                Most global directories focus on Western markets, leaving Indian professionals navigating
                                through subscription models and use cases that don&apos;t always align with local requirements.
                                AIBrainX.in is the solution—an editorial platform that treats AI discovery as a craft,
                                not just an automated list.
                            </p>
                        </div>
                    </section>

                    {/* For AI Tool Makers */}
                    <section className={styles.section}>
                        <div className={styles.ctaCard}>
                            <div className={styles.ctaContent}>
                                <h2>Are you an AI Tool Maker?</h2>
                                <p>
                                    Get featured on India&apos;s leading AI platform and reach thousands of
                                    prospective users in the world&apos;s fastest-growing tech market.
                                </p>
                                <Link href="/submit" className="btn btn-primary btn-lg">
                                    Submit Your Tool →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className={styles.section}>
                        <div className={styles.contactSection}>
                            <div className={styles.contactHeader}>
                                <h2>Get in Touch</h2>
                                <p>Have questions, feedback, or partnership proposals? We&apos;d love to hear from you.</p>
                            </div>
                            <div className={styles.contactGrid}>
                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>📧</span>
                                    <div>
                                        <strong>Email Us</strong>
                                        <p><a href="mailto:yadav.sandeep2710@gmail.com">yadav.sandeep2710@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>𝕏</span>
                                    <div>
                                        <strong>Follow Updates</strong>
                                        <p><a href="https://twitter.com/aibrainx" target="_blank" rel="noopener noreferrer">@aibrainx</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
