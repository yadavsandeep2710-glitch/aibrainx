import type { Metadata } from 'next';
import EmailCaptureForm from '@/components/EmailCaptureForm';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Get Free AI Tools Guide',
    description: 'Download our free guide: Top 25 Free AI Tools for Students & Creators. No credit card required.',
};

export default function FreeAIGuidePage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.hero}>
                        <div className={styles.badge}>
                            🎁 100% Free
                        </div>
                        <h1 className={styles.title}>
                            Top 25 Free AI Tools for <br />
                            Students & Creators
                        </h1>
                        <p className={styles.subtitle}>
                            Get instant access to our curated list of the best free AI tools.
                            No credit card required. No spam.
                        </p>
                    </div>

                    <div className={styles.formSection}>
                        <EmailCaptureForm
                            title="Get Your Free Guide"
                            description="Enter your email to receive instant access"
                            buttonText="Send Me the Free Guide"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className={styles.features}>
                        <h2>What's Inside the Free Guide</h2>
                        <div className={styles.featuresGrid}>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <div>
                                    <h3>25 Free AI Tools</h3>
                                    <p>Handpicked tools that are actually free (not just free trials)</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <div>
                                    <h3>Organized by Category</h3>
                                    <p>Writing, design, video, coding, research, and more</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <div>
                                    <h3>Quick Start Guides</h3>
                                    <p>Simple instructions to get started with each tool</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <div>
                                    <h3>Best Use Cases</h3>
                                    <p>Learn when to use each tool for maximum productivity</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.trust}>
                        <p>
                            🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
                        </p>
                        <p className={styles.trustNote}>
                            Join 10,000+ students and creators who get our weekly AI insights.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
