import React from 'react';
import Link from 'next/link';
import styles from './Disclosure.module.css';

const Disclosure: React.FC = () => {
    return (
        <div className={styles.disclosure}>
            <strong>Transparency Disclosure:</strong> This content is reader-supported. We may earn an affiliate commission on some links at no extra cost to you. Our reviews remain 100% independent, based on rigorous testing and a commitment to recommending only what works for India. Read our <Link href="/about" className={styles.link}>Editorial Independence Policy</Link>.
        </div>
    );
};

export default Disclosure;
