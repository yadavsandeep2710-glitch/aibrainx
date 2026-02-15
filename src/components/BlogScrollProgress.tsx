'use client';

import { useEffect, useState } from 'react';

export default function BlogScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setProgress((window.scrollY / scrollHeight) * 100);
            }
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.05)',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'var(--accent-gradient)',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                    transition: 'width 150ms ease-out',
                }}
            />
        </div>
    );
}
