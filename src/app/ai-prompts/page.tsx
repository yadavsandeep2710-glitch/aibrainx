import Link from 'next/link';
import type { Metadata } from 'next';
import { promptCategories, getExamplePrompts } from '@/data/prompt-data';
import PromptFAQ from '@/components/PromptFAQ';
import PromptSearch from '@/components/PromptSearch';
import styles from './page.module.css';

/* ===== Enhanced SEO Metadata ===== */
export const metadata: Metadata = {
    title: 'Free AI Prompt Library – Ready-to-Use AI Prompts for Work, Marketing & India | AIBrainX',
    description: 'Explore 30+ free, high-quality AI prompts for work, marketing, students, HR, content writing & Indian business. Copy & paste prompts for ChatGPT, Gemini & other AI tools.',
    alternates: {
        canonical: 'https://www.aibrainx.in/ai-prompts',
    },
    openGraph: {
        title: 'Free AI Prompt Library – Ready-to-Use AI Prompts for Work, Marketing & India | AIBrainX',
        description: 'Explore 30+ free, high-quality AI prompts for work, marketing, students, HR, content writing & Indian business. Copy & paste prompts for ChatGPT, Gemini & other AI tools.',
        type: 'website',
        url: 'https://www.aibrainx.in/ai-prompts',
        siteName: 'AIBrainX',
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free AI Prompt Library – Ready-to-Use AI Prompts | AIBrainX',
        description: 'Browse 30+ free AI prompts for work, marketing, students, HR & Indian business. Copy, paste & generate results instantly.',
        site: '@aibrainx',
    },
    robots: {
        index: true,
        follow: true,
    },
};

/* ===== FAQ Data for Index Page ===== */
const indexFAQs = [
    {
        question: 'What is an AI prompt?',
        answer: 'An AI prompt is a written instruction or question you give to an AI tool like ChatGPT or Gemini. The better your prompt, the more accurate and useful the AI\'s response will be. Think of it as a detailed brief that guides AI to produce exactly what you need.',
    },
    {
        question: 'How do I use AI prompts in ChatGPT?',
        answer: 'Simply copy any prompt from our library, open ChatGPT (or any AI tool), paste the prompt into the message box, replace the placeholder text (marked with {{ }}) with your specific details, and press send. The AI will generate a tailored response instantly.',
    },
    {
        question: 'Are these AI prompts free to use?',
        answer: 'Yes, absolutely! Every prompt in the AIBrainX library is 100% free to browse, copy, and use — for personal projects, work, freelancing, or even client deliverables. No sign-up needed.',
    },
    {
        question: 'Which AI tools work best with these prompts?',
        answer: 'Our prompts work with all major AI tools including ChatGPT (GPT-4), Google Gemini, Anthropic Claude, Microsoft Copilot, and Perplexity AI. They are written to be model-agnostic, so you can use them anywhere.',
    },
    {
        question: 'Can beginners use these prompts?',
        answer: 'Absolutely! Each prompt includes clear instructions and placeholder variables that make it easy for anyone to use — no prior AI experience needed. Just copy, fill in your details, and paste into any AI tool.',
    },
];

/* ===== Structured Data (JSON-LD) ===== */
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.aibrainx.in',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'AI Prompts',
            item: 'https://www.aibrainx.in/ai-prompts',
        },
    ],
};

const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free AI Prompt Library – Ready-to-Use AI Prompts for Work, Marketing & India',
    description: 'Explore 30+ free, high-quality AI prompts for work, marketing, students, HR, content writing & Indian business.',
    url: 'https://www.aibrainx.in/ai-prompts',
    inLanguage: 'en',
    isPartOf: {
        '@type': 'WebSite',
        name: 'AIBrainX',
        url: 'https://www.aibrainx.in',
    },
    publisher: {
        '@type': 'Organization',
        name: 'AIBrainX',
        url: 'https://www.aibrainx.in',
    },
    mainEntity: {
        '@type': 'ItemList',
        name: 'AI Prompt Categories',
        numberOfItems: 6,
        itemListElement: promptCategories.map((cat, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: cat.name,
            url: `https://www.aibrainx.in/ai-prompts/${cat.slug}`,
        })),
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: indexFAQs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
};

/* ===== Page Component ===== */
export default function AIPromptsPage() {
    return (
        <div className={styles.page}>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />

            {/* Breadcrumb UI */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className={styles.breadcrumbSep}>›</span>
                <span className={styles.breadcrumbCurrent}>AI Prompts</span>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.heroGrid} />
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <div className={styles.heroBadge}>
                        <span>💡</span> Free AI Prompt Library
                    </div>
                    <h1 className={styles.heroTitle}>
                        AI Prompts for
                        <span className={styles.heroGradient}> Every Need</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Browse high-quality, ready-to-use AI prompts for work, marketing, students,
                        HR, content writing, and Indian business. Just copy, paste, and go.
                    </p>

                    <div className={styles.heroSearch}>
                        <PromptSearch />
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>30+</span>
                            <span className={styles.statLabel}>Prompts</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>6</span>
                            <span className={styles.statLabel}>Categories</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Free</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Educational Section — "What Are AI Prompts?" */}
            <section className={`section ${styles.educationalSection}`}>
                <div className="container">
                    <div className={styles.eduContent}>
                        <h2 className={styles.eduTitle}>What Are AI Prompts &amp; Why They Matter?</h2>
                        <div className={styles.eduText}>
                            <p>
                                An <strong>AI prompt</strong> is a carefully written instruction that tells an AI tool —
                                like <Link href="/tools/chatgpt" className={styles.inlineLink}>ChatGPT</Link>,{' '}
                                Google Gemini, or Claude — exactly what you need. Think of it as a detailed brief:
                                the clearer and more specific your prompt, the better the AI&apos;s output will be.
                            </p>
                            <p>
                                Many users struggle to get useful AI responses because they use vague, one-line prompts.
                                A well-crafted prompt includes context, role instructions, formatting preferences, and specific
                                details — transforming generic AI outputs into professional-quality results. This is often called
                                <strong> prompt engineering</strong>.
                            </p>
                            <p>
                                Whether you&apos;re a complete beginner or an experienced professional, our curated prompt
                                library helps you skip the learning curve. Every prompt below is ready to copy, paste,
                                and customize for your unique needs. Start with any category below, or{' '}
                                <Link href="/blog" className={styles.inlineLink}>read our AI blog</Link> for
                                deeper tutorials on using AI tools effectively.
                            </p>
                        </div>
                        <div className={styles.eduLinks}>
                            <Link href="/blog" className={styles.eduLink}>
                                📖 AI Prompt Writing Tips
                            </Link>
                            <Link href="/tools" className={styles.eduLink}>
                                🛠️ Best AI Tools for Prompts
                            </Link>
                            <Link href="/ai-guides" className={styles.eduLink}>
                                📚 AI Mastery Guides
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid — with Example Prompts */}
            <section className={`section ${styles.categoriesSection}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Browse Prompt Categories</h2>
                        <p>Choose a category to find the perfect AI prompt for your use case</p>
                    </div>
                    <div className={styles.categoriesGrid}>
                        {promptCategories.map((cat) => {
                            const examples = getExamplePrompts(cat.slug, 2);
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/ai-prompts/${cat.slug}`}
                                    className={styles.categoryCard}
                                >
                                    <div className={styles.categoryIconWrap}>
                                        <span className={styles.categoryIcon}>{cat.icon}</span>
                                    </div>
                                    <div className={styles.categoryInfo}>
                                        <h3 className={styles.categoryName}>{cat.name}</h3>
                                        <p className={styles.categoryDesc}>
                                            {cat.description.substring(0, 120)}...
                                        </p>
                                        {/* Example Prompts Preview */}
                                        <div className={styles.examplePreviews}>
                                            {examples.map((ex, i) => (
                                                <div key={i} className={styles.examplePreview}>
                                                    <span className={styles.exampleBullet}>▸</span>
                                                    <span>{ex.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.categoryMeta}>
                                            <span className={styles.promptCount}>
                                                {cat.prompt_count} prompts
                                            </span>
                                            <span className={styles.viewLink}>
                                                View all prompts →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className={`section ${styles.howItWorks}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>How to Use AI Prompts</h2>
                        <p>Get started in 3 simple steps</p>
                    </div>
                    <div className={styles.stepsGrid}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h3>Browse &amp; Choose</h3>
                            <p>Explore categories and find the prompt that matches your need.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h3>Copy the Prompt</h3>
                            <p>Click &quot;Copy Prompt&quot; to copy it to your clipboard instantly.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h3>Paste &amp; Generate</h3>
                            <p>Paste the prompt into <Link href="/tools/chatgpt" className={styles.inlineLink}>ChatGPT</Link>, Gemini, or any AI tool and get results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-Links Between Categories */}
            <section className={`section ${styles.crossLinksSection}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Popular AI Prompt Collections</h2>
                        <p>Jump directly to the most popular prompt categories</p>
                    </div>
                    <div className={styles.crossLinksGrid}>
                        <Link href="/ai-prompts/ai-prompts-for-work" className={styles.crossLink}>
                            💼 Work Prompts — Draft emails, reports &amp; SOPs
                        </Link>
                        <Link href="/ai-prompts/ai-prompts-for-marketing" className={styles.crossLink}>
                            📢 Marketing Prompts — Ads, SEO &amp; social media
                        </Link>
                        <Link href="/ai-prompts/ai-prompts-for-students" className={styles.crossLink}>
                            🎓 Student Prompts — Essays, revision &amp; exam prep
                        </Link>
                        <Link href="/ai-prompts/ai-prompts-for-hr" className={styles.crossLink}>
                            👥 HR Prompts — JDs, onboarding &amp; policies
                        </Link>
                        <Link href="/ai-prompts/ai-prompts-for-content-writing" className={styles.crossLink}>
                            ✍️ Content Writing — Blogs, scripts &amp; copy
                        </Link>
                        <Link href="/ai-prompts/ai-prompts-for-indian-business" className={styles.crossLink}>
                            🇮🇳 Indian Business — GST, MSME &amp; pitch decks
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section with Schema */}
            <section className="section">
                <div className="container">
                    <PromptFAQ faqs={indexFAQs} categoryName="AI Prompts" />
                </div>
            </section>

            {/* Internal Links — Explore More */}
            <section className={`section ${styles.relatedSection}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Explore More from AIBrainX</h2>
                    </div>
                    <div className={styles.relatedGrid}>
                        <Link href="/tools" className={styles.relatedCard}>
                            <span className={styles.relatedIcon}>🛠️</span>
                            <h3>AI Tools Directory</h3>
                            <p>Discover 500+ AI tools with Indian pricing and reviews.</p>
                        </Link>
                        <Link href="/blog" className={styles.relatedCard}>
                            <span className={styles.relatedIcon}>📰</span>
                            <h3>AI Blog</h3>
                            <p>Daily AI insights, tutorials, and comparisons.</p>
                        </Link>
                        <Link href="/ai-guides" className={styles.relatedCard}>
                            <span className={styles.relatedIcon}>📚</span>
                            <h3>AI Guides</h3>
                            <p>Premium guides to master AI tools for your workflow.</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
