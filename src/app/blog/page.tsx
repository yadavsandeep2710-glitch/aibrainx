import { getPublishedPosts } from '@/lib/store';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: 'AI Blog | AIBrainX',
    description: 'Daily insights, comparisons, and tutorials on AI tools — written for Indian users 🇮🇳',
};

export default async function BlogPage() {
    const posts = await getPublishedPosts();
    const featuredPost = posts[0];

    const categories = Array.from(new Set(posts.map(p => p.category))).filter(Boolean).sort();

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>The AI Insider</h1>
                    <p className={styles.pageSubtitle}>
                        Premium insights, expert comparisons, and deep-dives into the future of AI.
                    </p>
                </div>

                {/* Categories Bar */}
                <div className={styles.categoriesBar}>
                    <div className={styles.categoriesList}>
                        <button className={styles.categoryPillActive}>All Posts</button>
                        {categories.map(cat => (
                            <button key={cat} className={styles.categoryPill}>{cat}</button>
                        ))}
                    </div>
                </div>

                {/* Featured Post Hero */}
                {featuredPost && (
                    <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredPost}>
                        <div className={styles.featuredImage}>
                            <img src={featuredPost.cover_image_url} alt={featuredPost.title} loading="lazy" />
                        </div>
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredBadge}>
                                <span className={styles.pulse}></span>
                                Featured Insight
                            </div>
                            <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                            <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                            <div className={styles.featuredMeta}>
                                <span>{featuredPost.author}</span>
                                <span className={styles.separator}></span>
                                <span>{featuredPost.published_at ? new Date(featuredPost.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
                                <span className={styles.separator}></span>
                                <span>{featuredPost.read_time} min read</span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Newsletter Section */}
                <section className={styles.newsletterSection}>
                    <div className={styles.newsletterGrid}>
                        <div className={styles.newsletterHeader}>
                            <h3>Join the AI Insider</h3>
                            <p>Get curated AI news, product breakdowns, and strategic insights delivered to your inbox.</p>
                        </div>
                        <form className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className={styles.newsletterInput}
                                required
                            />
                            <button type="submit" className={styles.newsletterButton}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

                {/* Posts Grid */}
                <div className={styles.postsGrid}>
                    {posts.slice(1).map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {posts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🖋️</p>
                        <h3 className={styles.featuredTitle}>The editorial is empty</h3>
                        <p className={styles.pageSubtitle}>Our AI insiders are currently crafting the next big story.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
