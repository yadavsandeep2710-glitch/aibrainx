import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Terms of Service — AIBrainX.in',
    description: 'Terms of Service for AIBrainX.in. Understand the rules for using our platform.',
};

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <span className={styles.lastUpdated}>LAST UPDATED: FEBRUARY 24, 2026</span>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <p className={styles.subtitle}>Rules and guidelines for using India&apos;s #1 AI Tools Directory.</p>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.content}>
                    <p>
                        Welcome to AIBrainX.in! These terms and conditions outline the rules and regulations for the use of
                        AIBrainX&apos;s Website, located at https://www.aibrainx.in.
                    </p>

                    <h2>1. Use of the Site</h2>
                    <p>
                        By accessing this website we assume you accept these terms and conditions. Do not continue to use
                        AIBrainX.in if you do not agree to take all of the terms and conditions stated on this page.
                    </p>

                    <h2>2. Intellectual Property</h2>
                    <p>
                        Unless otherwise stated, AIBrainX and/or its licensors own the intellectual property rights for all material
                        on AIBrainX.in. All intellectual property rights are reserved. You may access this from AIBrainX.in for
                        your own personal use subjected to restrictions set in these terms and conditions.
                    </p>

                    <h2>3. User-Submitted Content</h2>
                    <p>
                        When users submit tools for listing via our submission form, they grant AIBrainX.in a non-exclusive
                        royalty-free license to use, reproduce, and edit the submission content in the context of the directory.
                    </p>

                    <h2>4. Accuracy of Information</h2>
                    <p>
                        The information provided on AIBrainX.in is for general informational purposes only. While we endeavor
                        to keep the information up to date and correct, we make no representations or warranties of any kind,
                        express or implied, about the completeness, accuracy, reliability, or suitability of the AI tools listed.
                    </p>

                    <h2>5. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of India and you
                        irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </div>
            </div>
        </div>
    );
}
