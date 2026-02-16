import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import styles from './BlogCard.module.css';

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className={`${styles.card} ${featured ? styles.featured : ''}`}>
            <div className={styles.imageWrap}>
                <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className={styles.image}
                    loading={featured ? "eager" : "lazy"}
                />
                <div className={styles.overlay}></div>
                <span className={styles.category}>{post.category}</span>
            </div>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.date}>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Draft'}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.readTime}>{post.read_time} min read</span>
                </div>

                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.footer}>
                    <span className={styles.author}>By {post.author || 'AI Insider Team'}</span>
                    <span className={styles.readMore}>Read Article <span className={styles.arrow}>→</span></span>
                </div>
            </div>
        </Link>
    );
}
