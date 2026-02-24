import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Disclaimer — AIBrainX.in',
    description: 'Legal disclaimer for AIBrainX.in regarding AI tool performance and affiliate links.',
};

export default function DisclaimerPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <span className={styles.lastUpdated}>LAST UPDATED: FEBRUARY 24, 2026</span>
                    <h1 className={styles.title}>Legal Disclaimer</h1>
                    <p className={styles.subtitle}>Transparency and accountability for our users.</p>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>1. General Information</h2>
                    <p>
                        All the information on this website - https://www.aibrainx.in - is published in good faith and for
                        general information purpose only. AIBrainX.in does not make any warranties about the completeness,
                        reliability, and accuracy of this information.
                    </p>

                    <h2>2. External Links</h2>
                    <p>
                        Our website contains links to external websites that are not provided or maintained by or in any way
                        affiliated with AIBrainX.in. Please note that AIBrainX.in does not guarantee the accuracy, relevance,
                        timeliness, or completeness of any information on these external websites.
                    </p>

                    <h2>3. Affiliate Disclosure</h2>
                    <p>
                        Some of the links on AIBrainX.in are &quot;affiliate links&quot;. This means if you click on the link and purchase
                        the item, AIBrainX.in will receive an affiliate commission at no extra cost to you. This helps us
                        keep the platform free and updated for the Indian community.
                    </p>

                    <h2>4. No Professional Advice</h2>
                    <p>
                        The AI tool reviews and comparison guides are for informational purposes only. They do not constitute
                        professional technical or financial advice. Any action you take upon the information you find on this
                        website is strictly at your own risk.
                    </p>

                    <h2>5. Responsibility</h2>
                    <p>
                        AIBrainX.in will not be liable for any losses and/or damages in connection with the use of our website.
                    </p>
                </div>
            </div>
        </div>
    );
}
