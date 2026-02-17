'use client';

import styles from './PackageCard.module.css';
import { Package } from '@/lib/service-data';
import Link from 'next/link';

interface PackageCardProps {
    pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
    return (
        <div className={`${styles.card} ${pkg.popular ? styles.popular : ''}`}>
            {pkg.popular && <div className={styles.popularBadge}>Most Popular</div>}

            <div className={styles.header}>
                <h3 className={styles.title}>{pkg.name}</h3>
                <p className={styles.price}>{pkg.price}</p>
            </div>

            <ul className={styles.features}>
                {pkg.features.map((feature, index) => (
                    <li key={index}>
                        <span className={styles.check}>✓</span>
                        {feature}
                    </li>
                ))}
            </ul>

            <div className={styles.footer}>
                <p className={styles.bestFor}>{pkg.bestFor}</p>
                <Link href="/contact" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-secondary'} ${styles.cta}`}>
                    Get Started
                </Link>
            </div>
        </div>
    );
}
