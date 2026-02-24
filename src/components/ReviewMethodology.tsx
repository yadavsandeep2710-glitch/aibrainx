import React from 'react';
import styles from './ReviewMethodology.module.css';

interface ReviewMethodologyProps {
    testedOn?: string;
    duration?: string;
    criteria?: string[];
}

const ReviewMethodology: React.FC<ReviewMethodologyProps> = ({
    testedOn = "Web (Desktop & Mobile)",
    duration = "72+ Hours of Hands-on Use",
    criteria = ["Accuracy", "India-specific Utility", "Pricing Value", "Local Language Support", "User Interface"]
}) => {
    return (
        <div className={styles.methodology}>
            <h3 className={styles.title}>
                <span>🔍</span> Review Methodology
            </h3>
            <div className={styles.grid}>
                <div className={styles.item}>
                    <span className={styles.label}>Tested On</span>
                    <span className={styles.value}>{testedOn}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Trial Duration</span>
                    <span className={styles.value}>{duration}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Key Criteria</span>
                    <span className={styles.value}>{criteria.join(', ')}</span>
                </div>
            </div>
            <p className={styles.footer}>
                *Our reviews are based on actual software usage, competitor comparisons, and real-world testing from our office in India.
            </p>
        </div>
    );
};

export default ReviewMethodology;
