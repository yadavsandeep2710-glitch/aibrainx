import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Tools Directory (2026) – Free & Paid AI Tools in India',
    description: 'Browse a curated directory of AI tools with Indian pricing, features, comparisons & best use cases.',
    openGraph: {
        title: 'AI Tools Directory (2026) – Free & Paid AI Tools in India',
        description: 'Browse a curated directory of AI tools with Indian pricing, features, comparisons & best use cases.',
        type: 'website',
        locale: 'en_IN',
    },
    alternates: {
        canonical: 'https://aibrainx.in/tools',
    },
};

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
