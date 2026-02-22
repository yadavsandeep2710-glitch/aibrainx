'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subscribeNewsletter } from '@/lib/store';
import styles from './Footer.module.css';

const footerLinks = {
    'AI Tools': [
        { href: '/tools?category=writing', label: 'Writing Tools' },
        { href: '/tools?category=image-generation', label: 'Image Generators' },
        { href: '/tools?category=code-dev', label: 'Coding Tools' },
        { href: '/tools?category=productivity', label: 'Productivity' },
        { href: '/tools?category=chat-assistants', label: 'AI Chatbots' },
    ],
    'Resources': [
        { href: '/blog', label: 'Blog' },
        { href: '/ai-prompts', label: 'AI Prompts' },
        { href: '/tools', label: 'Tools Directory' },
        { href: '/submit', label: 'Submit a Tool' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ],
    'Legal': [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/disclaimer', label: 'Disclaimer' },
    ],
};

export default function Footer() {
    const [email, setEmail] = useState('');
    const [newsletterMsg, setNewsletterMsg] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setNewsletterMsg('Please enter a valid email');
            return;
        }
        const result = subscribeNewsletter(email);
        setNewsletterMsg(result.message);
        if (result.success) setEmail('');
        setTimeout(() => setNewsletterMsg(''), 4000);
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerTop}>
                    <div className={styles.footerBrand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>🧠</span>
                            <span className={styles.logoText}>
                                AI<span className={styles.logoAccent}>BrainX</span>
                                <span className={styles.logoDomain}>.in</span>
                            </span>
                        </Link>
                        <p className={styles.brandDescription}>
                            India&apos;s most trusted AI tools directory. Discover, compare, and find the perfect AI tools
                            for your needs — with pricing in ₹ and reviews from Indian users.
                        </p>
                        <form className={styles.newsletter} onSubmit={handleSubscribe}>
                            <p className={styles.newsletterLabel}>Get weekly AI updates 🇮🇳</p>
                            <div className={styles.newsletterForm}>
                                <input type="email" placeholder="your@email.com" className={styles.newsletterInput}
                                    value={email} onChange={e => setEmail(e.target.value)} />
                                <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
                            </div>
                            {newsletterMsg && <p className={styles.newsletterMsg}>{newsletterMsg}</p>}
                        </form>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className={styles.footerCol}>
                            <h4 className={styles.footerColTitle}>{title}</h4>
                            <ul className={styles.footerList}>
                                {links.map(link => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} AIBrainX.in — Made with ❤️ in India
                    </p>
                    <div className={styles.socialLinks}>
                        <a href="https://twitter.com/aibrainx" className={styles.socialLink} aria-label="Twitter" target="_blank" rel="noopener noreferrer">𝕏</a>
                        <a href="https://youtube.com/@aibrainx" className={styles.socialLink} aria-label="YouTube" target="_blank" rel="noopener noreferrer">▶</a>
                        <a href="https://linkedin.com/company/aibrainx" className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
