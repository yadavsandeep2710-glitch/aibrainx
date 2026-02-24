import React from 'react';
import Link from 'next/link';
import styles from './Disclosure.module.css';

const Disclosure: React.FC = () => {
    return (
        <div className={styles.disclosure}>
            <strong>Transparency Disclosure:</strong> This review is supported by our readers. When you purchase through links on our site, we may earn an affiliate commission at no extra cost to you. However, our editorial integrity remains our top priority, and we only recommend tools we have genuinely tested and found valuable for Indian users. Read our <Link href="/about/editorial-policy" className={styles.link}>Editorial Policy</Link>.
        </div>
    );
};

export default Disclosure;
