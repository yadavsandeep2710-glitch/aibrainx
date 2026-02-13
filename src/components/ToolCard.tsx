import Link from 'next/link';
import { Tool } from '@/lib/types';
import { categories } from '@/lib/data';
import styles from './ToolCard.module.css';

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    const category = categories.find(c => c.id === tool.category_id);
    const pricingBadge = {
        free: 'badge-free',
        freemium: 'badge-new',
        paid: 'badge-paid',
    };

    return (
        <Link href={`/tools/${tool.slug}`} className={styles.card}>
            <div className={styles.cardTop}>
                <div className={styles.logoWrap}>
                    <span className={styles.logoEmoji}>{category?.icon || '🤖'}</span>
                </div>
                <div className={styles.cardMeta}>
                    <span className={`badge ${pricingBadge[tool.pricing]}`}>{tool.pricing}</span>
                    {tool.featured && <span className="badge badge-featured">⭐ Featured</span>}
                </div>
            </div>

            <h3 className={styles.cardTitle}>{tool.name}</h3>
            <p className={styles.cardTagline}>{tool.tagline}</p>

            <div className={styles.cardFooter}>
                <div className={styles.rating}>
                    <span className={styles.ratingStars}>{'★'.repeat(Math.round(tool.rating))}</span>
                    <span className={styles.ratingValue}>{tool.rating}</span>
                    <span className={styles.ratingCount}>({tool.review_count})</span>
                </div>
                {category && <span className={styles.categoryTag}>{category.name}</span>}
            </div>

            <div className={styles.tags}>
                {tool.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                ))}
            </div>
        </Link>
    );
}
