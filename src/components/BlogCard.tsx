import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import styles from './BlogCard.module.css';

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className={styles.card}>
            <div className={styles.imageWrap}>
                <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className={styles.image}
                    loading="lazy"
                />
                <span className={styles.badge}>{post.category}</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.footer}>
                    <div className={styles.meta}>
                        <span>{post.read_time} min read</span>
                        <span>•</span>
                        <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                    </div>
                    <span className={styles.readMore}>Read →</span>
                </div>
            </div>
        </Link>
    );
}
