'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import styles from './Header.module.css';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    {
        href: '/seo-tools',
        label: 'AI SEO Tools',
        dropdown: [
            { href: '/seo-tools/seo-audit', label: 'SEO Audit' },
            { href: '/seo-tools/keyword-research', label: 'Keyword Discovery' },
            { href: '/seo-tools/rank-tracker', label: 'Rank Tracker' },
            { href: '/seo-tools/search-console', label: 'Search Console' },
            { href: '/seo-tools/ai-seo-assistant', label: 'AI Assistant' },
        ]
    },
    { href: '/tools', label: 'AI Tools Directory' }, // Renamed slightly to avoid confusion
    { href: '/ai-guides', label: 'AI Guides' },
    { href: '/blog', label: 'Blog' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, signInWithGoogle, signOut } = useAuth();

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🧠</span>
                    <span className={styles.logoText}>
                        AI<span className={styles.logoAccent}>BrainX</span>
                        <span className={styles.logoDomain}>.in</span>
                    </span>
                </Link>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
                    {navLinks.map(link => (
                        link.dropdown ? (
                            <div key={link.href} className={styles.dropdown}>
                                <div className={`${styles.navLink} ${styles.dropdownTrigger} ${pathname.startsWith(link.href) ? styles.navLinkActive : ''}`}>
                                    {link.label}
                                    <span className={styles.dropdownArrow}>▼</span>
                                </div>
                                <div className={styles.dropdownMenu}>
                                    {link.dropdown.map(item => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={styles.dropdownItem}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                    <Link href="/submit" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Submit Tool</Link>
                    <Link href="/about" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>About</Link>
                </nav>

                <div className={styles.headerActions}>
                    {user ? (
                        <div className={styles.userMenu}>
                            <div className={styles.userInfo}>
                                <img
                                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=6366f1&color=fff`}
                                    alt="Profile"
                                    className={styles.userAvatar}
                                />
                                <span className={styles.userName}>{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                            </div>
                            <button onClick={handleSignOut} className={styles.signOutBtn}>
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleSignIn} className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
                            <span className={styles.googleIcon}>🔐</span>
                            Sign In
                        </button>
                    )}
                    <button
                        className={styles.menuToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.menuBarOpen1 : ''}`} />
                        <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.menuBarOpen2 : ''}`} />
                        <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.menuBarOpen3 : ''}`} />
                    </button>
                </div>
            </div>

            {mobileMenuOpen && <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />}
        </header>
    );
}
