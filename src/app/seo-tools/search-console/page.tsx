'use client';

import { useState } from 'react';

type GscData = {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries: { query: string; clicks: number; position: number }[];
    insights: string[];
};

export default function SearchConsolePage() {
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<GscData | null>(null);

    const handleConnect = () => {
        setLoading(true);
        // Simulate OAuth flow and data fetching
        setTimeout(() => {
            setData({
                clicks: 1250,
                impressions: 45000,
                ctr: 2.8,
                position: 14.2,
                topQueries: [
                    { query: 'best seo tools 2025', clicks: 120, position: 3.1 },
                    { query: 'ai content writer', clicks: 95, position: 5.4 },
                    { query: 'keyword research free', clicks: 80, position: 2.9 },
                    { query: 'how to rank higher', clicks: 65, position: 8.7 },
                    { query: 'google search console api', clicks: 40, position: 1.2 },
                ],
                insights: [
                    'Your CTR for "best seo tools" is below average. Consider rewriting the meta description to include "free trial" or "2025 guide".',
                    'You are ranking #5 for "ai content writer" but have high impressions. Adding a comparison table might boost you to top 3.',
                    'New opportunity: "seo audit checklist" is gaining traction. Create a dedicated blog post for this topic.',
                ]
            });
            setIsConnected(true);
            setLoading(false);
        }, 2000);
    };

    if (!isConnected) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
                <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                    Search Console Insights
                </h1>
                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                    Connect your Google Search Console to unlock AI-powered insights that help you understand *why* you rank and how to improve.
                </p>

                <div className="bg-[#151b2e] border border-gray-800 rounded-2xl p-12 shadow-2xl flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl mb-6">
                        🚀
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Connect Your Property</h2>
                    <p className="text-gray-500 mb-8 max-w-md">
                        Securely connect to see your top performing keywords, pages, and get actionable AI recommendations.
                    </p>
                    <button
                        onClick={handleConnect}
                        disabled={loading}
                        className="bg-white text-gray-900 font-bold rounded-xl px-8 py-4 hover:shadow-lg hover:bg-gray-100 transition-all flex items-center gap-3 disabled:opacity-70"
                    >
                        {loading ? (
                            <span>Connecting...</span>
                        ) : (
                            <>
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                Sign in with Google
                            </>
                        )}
                    </button>
                    <div className="mt-6 text-xs text-gray-600">
                        * This is a demo simulation. No real data is accessed.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Performance Overview</h1>
                <button
                    onClick={() => { setIsConnected(false); setData(null); }}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                    Disconnect
                </button>
            </div>

            {/* Key Metrics */}
            {data && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#151b2e] border border-gray-800 p-6 rounded-2xl">
                        <p className="text-gray-400 text-sm mb-1">Total Clicks</p>
                        <p className="text-3xl font-bold text-white">{data.clicks.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#151b2e] border border-gray-800 p-6 rounded-2xl">
                        <p className="text-gray-400 text-sm mb-1">Total Impressions</p>
                        <p className="text-3xl font-bold text-white">{data.impressions.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#151b2e] border border-gray-800 p-6 rounded-2xl">
                        <p className="text-gray-400 text-sm mb-1">Avg. CTR</p>
                        <p className="text-3xl font-bold text-green-400">{data.ctr}%</p>
                    </div>
                    <div className="bg-[#151b2e] border border-gray-800 p-6 rounded-2xl">
                        <p className="text-gray-400 text-sm mb-1">Avg. Position</p>
                        <p className="text-3xl font-bold text-orange-400">{data.position}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Queries */}
                <div className="lg:col-span-2 bg-[#151b2e] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-6">Top Search Queries</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                    <th className="pb-3 font-medium">Query</th>
                                    <th className="pb-3 font-medium text-right">Clicks</th>
                                    <th className="pb-3 font-medium text-right">Position</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {data?.topQueries.map((q, i) => (
                                    <tr key={i} className="group hover:bg-gray-800/30 transition-colors">
                                        <td className="py-4 text-gray-200 font-medium">{q.query}</td>
                                        <td className="py-4 text-right text-gray-400 group-hover:text-white">{q.clicks}</td>
                                        <td className="py-4 text-right text-yellow-500 font-medium">{q.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-br from-[#151b2e] to-[#1e2642] border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">✨</div>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-2xl">🤖</span> AI Insights
                    </h2>
                    <div className="space-y-4">
                        {data?.insights.map((insight, i) => (
                            <div key={i} className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-200 leading-relaxed">
                                {insight}
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-all text-sm">
                        Generate New Insights
                    </button>
                </div>
            </div>
        </div>
    );
}
