import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Privacy Policy — AIBrainX.in',
    description: 'Privacy Policy for AIBrainX.in. Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <span className={styles.lastUpdated}>LAST UPDATED: FEBRUARY 24, 2026</span>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.subtitle}>Your privacy is 100% important to us.</p>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.content}>
                    <p>
                        At AIBrainX.in, accessible from https://www.aibrainx.in, one of our main priorities is the privacy of our visitors.
                        This Privacy Policy document contains types of information that is collected and recorded by AIBrainX.in and how we use it.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        If you contact us directly, we may receive additional information about you such as your name, email address,
                        the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                        When you register for our newsletter, we only ask for your email address.
                    </p>

                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Communicate with you, either directly or through one of our partners</li>
                    </ul>

                    <h2>3. Cookies and Web Beacons</h2>
                    <p>
                        Like any other website, AIBrainX.in uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos;
                        preferences, and the pages on the website that the visitor accessed or visited. The information is used to
                        optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
                    </p>

                    <h2>4. Third-Party Privacy Policies</h2>
                    <p>
                        AIBrainX.in&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult
                        the respective Privacy Policies of these third-party AI tool providers for more detailed information.
                        It may include their practices and instructions about how to opt-out of certain options.
                    </p>

                    <h2>5. Consent</h2>
                    <p>
                        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                    </p>
                </div>
            </div>
        </div>
    );
}
