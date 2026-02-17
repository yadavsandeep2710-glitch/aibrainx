'use client';

import styles from './ServiceCard.module.css';
import { Service } from '@/lib/service-data';

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                {service.icon}
            </div>

            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.description}>{service.description}</p>

            <ul className={styles.features}>
                {service.features.map((feature, index) => (
                    <li key={index}>
                        <span className={styles.check}>✓</span>
                        {feature}
                    </li>
                ))}
            </ul>

            <div className={styles.meta}>
                <div className={styles.bestFor}>
                    <strong>Best for:</strong> {service.bestFor}
                </div>
                {service.pricingNote && (
                    <div className={styles.pricing}>
                        {service.pricingNote}
                    </div>
                )}
            </div>
        </div>
    );
}
