import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import styles from './BlogCard.module.css';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className={styles.card}>
            <div className={styles.imageWrap}>
                <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className={styles.image}
                    loading="lazy"
                />
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
                    <span className={styles.author}>By {post.author}</span>
                    <span className={styles.readMore}>Read more →</span>
                </div>
            </div>
        </Link>
    );
}
