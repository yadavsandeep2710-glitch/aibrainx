import { getPublishedPosts } from '@/lib/store';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: 'AI Insider | Premium AI Insights for India',
    description: 'Deep dives, strategic analysis, and expert reviews of the AI landscape in India. Read the future, today.',
};

export default async function BlogPage() {
    const posts = await getPublishedPosts();
    const featuredPost = posts[0];
    const recentPosts = posts.slice(1, 7); // Next 6 posts
    const trendingPosts = posts.slice(7, 10); // Simple "trending" mock

    const categories = Array.from(new Set(posts.map(p => p.category))).filter(Boolean).sort();

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <p className={styles.label}>The Editorial</p>
                    <h1 className={styles.title}>AI Insider</h1>
                    <p className={styles.subtitle}>
                        Intelligence for the intelligent. Curated perspectives on Artificial Intelligence in India.
                    </p>
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
                                />
                                <div className={styles.heroOverlay}></div>
                            </div>
                            <div className={styles.heroContent}>
                                <span className={styles.heroCategory}>{featuredPost.category}</span>
                                <h2 className={styles.heroTitle}>{featuredPost.title}</h2>
                                <p className={styles.heroExcerpt}>{featuredPost.excerpt}</p>
                                <div className={styles.heroMeta}>
                                    <span>{featuredPost.author}</span>
                                    <span className={styles.dot}>•</span>
                                    <span>{featuredPost.read_time} min read</span>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Categories Scroll */}
                <div className={styles.categoryScroll}>
                    <button className={`${styles.categoryPill} ${styles.active}`}>Latest</button>
                    {categories.map(cat => (
                        <button key={cat} className={styles.categoryPill}>{cat}</button>
                    ))}
                </div>

                <div className={styles.mainGrid}>
                    {/* Left Column: Recent Posts Grid */}
                    <div className={styles.contentColumn}>
                        <h3 className={styles.sectionHeading}>Latest Stories</h3>
                        <div className={styles.postsGrid}>
                            {recentPosts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.newsletterWidget}>
                            <h3 className={styles.widgetTitle}>Join the Inner Circle</h3>
                            <p className={styles.widgetText}>Weekly strategic AI insights, directly to your inbox. No noise.</p>
                            <form className={styles.sidebarForm}>
                                <input type="email" placeholder="Your email address" className={styles.sidebarInput} required />
                                <button type="submit" className={styles.sidebarButton}>Subscribe</button>
                            </form>
                        </div>

                        {trendingPosts.length > 0 && (
                            <div className={styles.trendingWidget}>
                                <h3 className={styles.widgetTitle}>Trending Now</h3>
                                <ul className={styles.trendingList}>
                                    {trendingPosts.map((post, index) => (
                                        <li key={post.id} className={styles.trendingItem}>
                                            <span className={styles.trendingNumber}>0{index + 1}</span>
                                            <Link href={`/blog/${post.slug}`} className={styles.trendingLink}>
                                                {post.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}
