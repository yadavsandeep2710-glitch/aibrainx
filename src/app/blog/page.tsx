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

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>AI Blog</h1>
                    <p className={styles.pageSubtitle}>
                        Daily insights, comparisons, and tutorials on AI tools — written for Indian users 🇮🇳
                    </p>
                </div>

                {/* Featured Post */}
                {featuredPost && (
                    <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredPost}>
                        <div className={styles.featuredImage}>
                            <img src={featuredPost.cover_image_url} alt={featuredPost.title} loading="lazy" />
                        </div>
                        <div className={styles.featuredContent}>
                            <span className={styles.featuredBadge}>Latest</span>
                            <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                            <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                            <div className={styles.featuredMeta}>
                                <span>{featuredPost.published_at ? new Date(featuredPost.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
                                <span>·</span>
                                <span>{featuredPost.read_time} min read</span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Posts Grid */}
                <div className={styles.postsGrid}>
                    {posts.slice(1).map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {posts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '3rem' }}>📝</p>
                        <h3>No posts yet</h3>
                        <p>Check back soon for fresh AI insights!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
