import { getPublishedPosts } from '@/lib/store';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: 'AI Insider | Premium AI Insights for India',
    description: 'Deep dives, strategic analysis, and expert reviews of the AI landscape in India. Read the future, today.',
    keywords: 'AI, Artificial Intelligence, India, ChatGPT, Gemini, Midjourney, AI tools, machine learning, deep learning, technology, tech news, AI guides, AI tutorials, Indian AI, AI for students, AI for businesses',
    authors: ['AI Insider Editorial Team'],
    category: 'Technology',
    image: '/social/blog-cover.jpg',
    publishedAt: '2026-02-15',
    updatedAt: '2026-02-15',
    alternates: {
        canonical: '/blog',
        languages: {
            en: '/blog'
        }
    }
};

export default async function BlogPage() {
    const posts = await getPublishedPosts();
    const featuredPost = posts[0];
    const recentPosts = posts.slice(1); // Show all remaining posts in the grid
    const trendingPosts = posts.slice(0, 3); // Mock trending posts

    const categories = Array.from(new Set(posts.map(p => p.category))).filter(Boolean).sort();

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <span className={styles.label}>The Editorial</span>
                    <h1 className={styles.title}>AI Insider</h1>
                    <p className={styles.subtitle}>
                        Intelligence for the intelligent. Curated perspectives on Artificial Intelligence in India.
                    </p>
                    <div className={styles.headerMeta}>
                        <span className={styles.postCount}>{posts.length} Articles</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.readTime}>Updated Daily</span>
                    </div>
                </header>

                {/* Featured Hero Section */}
                {featuredPost && (
                    <section className={styles.heroSection}>
                        <Link href={`/blog/${featuredPost.slug}`} className={styles.heroCard}>
                            <div className={styles.heroImageWrapper}>
                                <img
                                    src={featuredPost.cover_image_url}
                                    alt={featuredPost.title}
                                    className={styles.heroImage}
                                    loading="eager"
                                />
                                <div className={styles.heroOverlay}></div>
                            </div>
                            <div className={styles.heroContent}>
                                <div className={styles.heroCategory}>{featuredPost.category}</div>
                                <h2 className={styles.heroTitle}>{featuredPost.title}</h2>
                                <p className={styles.heroExcerpt}>{featuredPost.excerpt}</p>
                                <div className={styles.heroMeta}>
                                    <span>{featuredPost.author || 'AI Insider'}</span>
                                    <span className={styles.dot}>•</span>
                                    <span>{featuredPost.read_time} min read</span>
                                    <span className={styles.dot}>•</span>
                                    <time dateTime={featuredPost.published_at || featuredPost.created_at}>{new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString()}</time>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Categories */}
                <div className={styles.categoryScroll}>
                    <button className={`${styles.categoryPill} ${styles.active}`}>All Stories</button>
                    {categories.map(cat => (
                        <button key={cat} className={styles.categoryPill}>{cat}</button>
                    ))}
                </div>

                <div className={styles.mainGrid}>
                    {/* Left Column: Recent Posts Grid */}
                    <div className={styles.contentColumn}>
                        <div className={styles.sectionHeading}>
                            Latest Stories
                        </div>
                        <div className={styles.postsGrid}>
                            {recentPosts.map(post => (
                                <BlogCard key={post.id} post={post} featured={false} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className={styles.sidebar}>
                        {/* Newsletter Widget */}
                        <div className={styles.newsletterWidget}>
                            <div className={styles.widgetHeader}>
                                <h3 className={styles.widgetTitle}>Join the Inner Circle</h3>
                                <span className={styles.widgetBadge}>Free</span>
                            </div>
                            <p className={styles.widgetText}>
                                Weekly strategic AI insights, directly to your inbox. No noise.
                            </p>
                            <form className={styles.sidebarForm}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className={styles.sidebarInput}
                                    required
                                    aria-label="Email address for newsletter subscription"
                                />
                                <button type="submit" className={styles.sidebarButton} aria-label="Subscribe to newsletter">
                                    Subscribe
                                </button>
                            </form>
                            <div className={styles.subscriptionStats}>
                                <span className={styles.statItem}>10K+ Subscribers</span>
                                <span className={styles.statItem}>Weekly Updates</span>
                            </div>
                        </div>

                        {/* Trending Widget */}
                        {trendingPosts.length > 0 && (
                            <div className={styles.trendingWidget}>
                                <h3 className={styles.widgetTitle}>Trending Now</h3>
                                <ul className={styles.trendingList}>
                                    {trendingPosts.map((post, index) => (
                                        <li key={post.id} className={styles.trendingItem}>
                                            <span className={styles.trendingNumber}>0{index + 1}</span>
                                            <div>
                                                <Link href={`/blog/${post.slug}`} className={styles.trendingLink}>
                                                    {post.title}
                                                </Link>
                                                <div className={styles.trendingMeta}>
                                                    <span className={styles.trendingCategory}>{post.category}</span>
                                                    <span className={styles.trendingReadTime}>{post.read_time} min</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Recent Widget */}
                        <div className={styles.recentWidget}>
                            <h3 className={styles.widgetTitle}>Editors Choice</h3>
                            <div className={styles.recentList}>
                                {recentPosts.slice(0, 3).map((post) => (
                                    <div key={post.id} className={styles.recentItem}>
                                        <Link href={`/blog/${post.slug}`} className={styles.recentLink}>
                                            {post.title}
                                        </Link>
                                        <time dateTime={post.published_at || post.created_at} className={styles.recentDate}>
                                            {new Date(post.published_at || post.created_at).toLocaleDateString()}
                                        </time>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Categories Widget */}
                        <div className={styles.categoriesWidget}>
                            <h3 className={styles.widgetTitle}>Topics</h3>
                            <div className={styles.categoryList}>
                                {categories.map(cat => (
                                    <button key={`small-${cat}`} className={styles.categoryPillSmall}>{cat}</button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
