import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'About AIBrainX.in — Our Editorial Team & Trust Standards',
    description: 'Learn about the AIBrainX Editorial Team, our rigorous AI tool testing methodology, and our commitment to providing trustworthy AI advice for the Indian ecosystem.',
};

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* AboutPage & Author Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "AboutPage",
                                "@id": "https://www.aibrainx.in/about/#webpage",
                                "url": "https://www.aibrainx.in/about",
                                "name": "About AIBrainX - Our Editorial Team & Methodology",
                                "isPartOf": { "@id": "https://aibrainx.in/#website" },
                                "description": "Learn about the AIBrainX Editorial Team, our AI tool testing methodology, and our commitment to trustworthiness for Indian users.",
                                "mainEntity": { "@id": "https://aibrainx.in/#organization" },
                                "inLanguage": "en-IN"
                            },
                            {
                                "@type": "Organization",
                                "@id": "https://www.aibrainx.in/about/#author",
                                "name": "AIBrainX Editorial Team",
                                "description": "A team of AI researchers and reviewers focused on providing hands-on testing of AI tools and workflows for the Indian market.",
                                "parentOrganization": { "@id": "https://aibrainx.in/#organization" },
                                "url": "https://www.aibrainx.in/about"
                            }
                        ]
                    })
                }}
            />
            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>TRUSTED AI DISCOVERY</span>
                        <h1 className={styles.heroTitle}>Built for India, <span className={styles.gradientText}>Verified by Humans</span></h1>
                        <p className={styles.heroSubtitle}>
                            AIBrainX.in is India&apos;s leading platform for manually-curated AI tools,
                            practical prompt engineering, and SaaS research that matters to Indian professionals.
                        </p>
                    </div>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.content}>

                    {/* Mission Section */}
                    <section className={styles.trustSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionLabel}>OUR MISSION</h2>
                            <h3 className={styles.sectionTitle}>Democratizing AI for Every Indian</h3>
                        </div>
                        <div className={styles.textBlock}>
                            <p>
                                At AIBrainX.in, we believe that Artificial Intelligence shouldn&apos;t be a mystery reserved for tech giants.
                                Our mission is to empower Indian students, creators, freelancers, and small businesses by providing them
                                with the most practical, real-world AI knowledge.
                            </p>
                            <p>
                                We focus on tools that work in the Indian context—considering local pricing (₹), local workflows,
                                and regional usability. Whether you're an engineering student from Pune or a digital marketer from Bangalore,
                                we are here to help you navigate the AI era with confidence.
                            </p>
                        </div>
                    </section>

                    {/* Who We Are - Authorship */}
                    <section className={styles.trustSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionLabel}>WHO WE ARE</h2>
                            <h3 className={styles.sectionTitle}>The AIBrainX Editorial Team</h3>
                        </div>
                        <div className={styles.authorCard}>
                            <div className={styles.authorAvatar}>AX</div>
                            <div className={styles.authorInfo}>
                                <h4>Human-First, Always</h4>
                                <p>
                                    Every article, review, and prompt on this site is produced or verified by the <strong>AIBrainX Editorial Team</strong>.
                                    We are a group of Indian AI researchers, software engineers, and digital content strategists.
                                    Unlike "content farms" that use automated AI to write about AI, we rely on hands-on experience and human intuition.
                                </p>
                                <p>
                                    We do not publish anonymous or unverified content. Every tool listed in our directory has been
                                    manually reviewed to ensure it meets our quality and safety standards for the Indian ecosystem.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Experience & Expertise */}
                    <section className={styles.trustSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionLabel}>EXPERTISE</h2>
                            <h3 className={styles.sectionTitle}>Experience-Driven Insights</h3>
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.itemCard}>
                                <div className={styles.itemIcon}>🛠️</div>
                                <h5>Hands-on Testing</h5>
                                <p>We don't just read features; we sign up, pay for trials, and use tools in real projects before recommending them.</p>
                            </div>
                            <div className={styles.itemCard}>
                                <div className={styles.itemIcon}>✍️</div>
                                <h5>Prompt Engineering</h5>
                                <p>Our team develops custom prompt libraries specifically analyzed for Indian use cases and educational needs.</p>
                            </div>
                            <div className={styles.itemCard}>
                                <div className={styles.itemIcon}>📈</div>
                                <h5>SaaS Research</h5>
                                <p>We monitor the global SaaS market to find the best value-for-money AI solutions for Indian businesses.</p>
                            </div>
                        </div>
                    </section>

                    {/* Methodology */}
                    <section className={styles.methodologyBox}>
                        <h3>Our Content Review Methodology</h3>
                        <p>Transparency is the foundation of EEAT (Experience, Expertise, Authoritativeness, Trust). Here is exactly how we evaluate content:</p>
                        <ul className={styles.methodList}>
                            <li><strong>Step 1: Initial Discovery</strong> — We find tools through research, community boards, and developer submissions.</li>
                            <li><strong>Step 2: Utility Analysis</strong> — We determine if the tool solves a real problem for our Indian audience.</li>
                            <li><strong>Step 3: Performance Audit</strong> — We test the tool's speed, accuracy, and output quality.</li>
                            <li><strong>Step 4: Pricing Check</strong> — We verify if the tool is affordable and offers INR payment options or localized value.</li>
                            <li><strong>Step 5: Peer Review</strong> — Content is reviewed for technical accuracy and clarity before publication.</li>
                        </ul>
                    </section>

                    {/* Independence & Transparency */}
                    <section className={styles.trustSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionLabel}>TRANSPARENCY</h2>
                            <h3 className={styles.sectionTitle}>Editorial Independence</h3>
                        </div>
                        <div className={styles.transparencyCard}>
                            <p>
                                <strong>Affiliate Disclosure:</strong> Some of the links on AIBrainX.in are affiliate links. This means if you
                                purchase a service through our link, we may earn a small commission at no additional cost to you.
                                This helps us keep our research free for everyone.
                            </p>
                            <p>
                                <strong>Editorial Integrity:</strong> A commission or partnership never influences our reviews.
                                We are happy to call out a tool's "Cons" even if we are their affiliate. Our first loyalty is to
                                you, the Indian user. We do not accept payment for positive reviews.
                            </p>
                        </div>
                    </section>

                    {/* Trust & Accuracy */}
                    <section className={styles.trustSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionLabel}>RELIABILITY</h2>
                            <h3 className={styles.sectionTitle}>Commitment to Accuracy</h3>
                        </div>
                        <div className={styles.textBlock}>
                            <p>
                                The world of AI moves fast. A tool that was "Best in Class" in 2024 might be outdated by 2026.
                                That&apos;s why we emphasize <strong>Freshness</strong>. We visually mark our articles with "Last Updated"
                                labels and perform periodic audits to remove defunct tools or outdated prompts.
                            </p>
                            <p>
                                We are human, and we may occasionally make mistakes. We encourage our community to report errors,
                                outdated pricing, or broken links. We commit to correcting any verified inaccuracies within 24-48 business hours.
                            </p>
                        </div>
                    </section>

                    {/* Contact & Feedback */}
                    <section className={styles.ctaSection}>
                        <div className={styles.ctaCard}>
                            <h3>Help Us Improve</h3>
                            <p>Have you used an AI tool that we haven&apos;t listed? Or did you find a bug in one of our guides? Your feedback builds AIBrainX.</p>
                            <div className={styles.ctaButtons}>
                                <Link href="/contact" className="btn btn-primary">Contact the Team</Link>
                                <Link href="/submit" className="btn btn-outline">Submit a Tool</Link>
                            </div>
                        </div>
                    </section>

                    <footer className={styles.closing}>
                        <p>Human-Reviewed. India-Focused. Built for Trust.</p>
                        <p className={styles.copyright}>© 2026 AIBrainX.in Editorial Team</p>
                    </footer>

                </div>
            </div>
        </div>
    );
}
