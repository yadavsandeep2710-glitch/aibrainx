'use client';

import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: {
        slug: string;
        title: string;
        subtitle?: string;
        description: string;
        price_inr: number;
        original_price_inr?: number;
        product_type: string;
        features?: string[];
    };
    featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
    const discount = product.original_price_inr
        ? Math.round(((product.original_price_inr - product.price_inr) / product.original_price_inr) * 100)
        : 0;

    return (
        <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
            {discount > 0 && (
                <div className={styles.badge}>Save {discount}%</div>
            )}

            <div className={styles.header}>
                <div className={styles.type}>
                    {product.product_type === 'guide' && '📚'}
                    {product.product_type === 'sheet' && '📊'}
                    {product.product_type === 'bundle' && '🎁'}
                    {product.product_type === 'report' && '📈'}
                    <span>{product.product_type}</span>
                </div>
                <h3 className={styles.title}>{product.title}</h3>
                {product.subtitle && (
                    <p className={styles.subtitle}>{product.subtitle}</p>
                )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {product.features && product.features.length > 0 && (
                <ul className={styles.features}>
                    {product.features.slice(0, 3).map((feature, i) => (
                        <li key={i}>
                            <span className={styles.check}>✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>
            )}

            <div className={styles.footer}>
                <div className={styles.pricing}>
                    <div className={styles.price}>
                        ₹{product.price_inr}
                        {product.original_price_inr && (
                            <span className={styles.originalPrice}>₹{product.original_price_inr}</span>
                        )}
                    </div>
                    <div className={styles.priceLabel}>One-time payment</div>
                </div>

                <Link
                    href={`/ai-guides/${product.slug}`}
                    className={`btn ${featured ? 'btn-primary' : 'btn-secondary'} btn-lg ${styles.cta}`}
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
}
