'use client';

import { useState } from 'react';

type AuditResult = {
    url: string;
    scores: {
        performance: number;
        seo: number;
        accessibility: number;
    };
    metrics: {
        fcp: string;
        lcp: string;
        cls: string;
    };
    issues: string[];
};

export default function SeoAuditPage() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState<AuditResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        // Basic formatting
        let formattedUrl = url;
        if (!url.startsWith('http')) {
            formattedUrl = `https://${url}`;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch(`/api/seo/audit?url=${encodeURIComponent(formattedUrl)}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Audit failed');
            }

            setResult({
                url: data.url,
                scores: data.scores || { performance: 0, seo: 0, accessibility: 0 },
                metrics: data.metrics || { fcp: '-', lcp: '-', cls: '-' },
                issues: data.issues || []
            });
        } catch (err) {
            setError('Failed to analyze the website. Please check the URL and try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 0.9) return 'text-green-500 border-green-500';
        if (score >= 0.5) return 'text-yellow-500 border-yellow-500';
        return 'text-red-500 border-red-500';
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
                    Website SEO Audit
                </h1>
                <p className="text-gray-400 text-lg">
                    Get a comprehensive analysis of your site's performance, SEO, and accessibility.
                </p>
            </div>

            <div className="bg-[#151b2e] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
                <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter website URL (e.g., aibrainx.in)"
                        className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-lg"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl px-8 py-4 hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {loading ? 'Analyzing...' : 'Run Audit'}
                    </button>
                </form>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-8 text-center">
                    {error}
                </div>
            )}

            {result && (
                <div className="animate-fade-in-up space-y-8">
                    {/* Scores */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Performance', score: result.scores.performance },
                            { label: 'SEO', score: result.scores.seo },
                            { label: 'Accessibility', score: result.scores.accessibility },
                        ].map((item) => (
                            <div key={item.label} className="bg-[#151b2e] border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                                <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl font-bold mb-4 ${getScoreColor(item.score)}`}>
                                    {Math.round(item.score * 100)}
                                </div>
                                <h3 className="text-xl font-semibold text-white">{item.label}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Metrics */}
                    <div className="bg-[#151b2e] border border-gray-800 rounded-2xl p-6 md:p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Core Web Vitals</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                                <p className="text-gray-400 text-sm mb-1">First Contentful Paint</p>
                                <p className="text-2xl font-semibold text-white">{result.metrics.fcp}</p>
                            </div>
                            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                                <p className="text-gray-400 text-sm mb-1">Largest Contentful Paint</p>
                                <p className="text-2xl font-semibold text-white">{result.metrics.lcp}</p>
                            </div>
                            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                                <p className="text-gray-400 text-sm mb-1">Cumulative Layout Shift</p>
                                <p className="text-2xl font-semibold text-white">{result.metrics.cls}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
