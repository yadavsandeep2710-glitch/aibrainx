import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        // Call Google PageSpeed Insights API (mobile strategy by default)
        // No key used here - strictly rate limited but free for testing.
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&strategy=mobile`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errData = await response.json();
            console.error('PageSpeed API Error:', errData);
            throw new Error(errData.error?.message || 'Failed to analyze website');
        }

        const data = await response.json();

        // Extract key metrics
        const lighthouse = data.lighthouseResult;
        return NextResponse.json({
            url,
            scores: {
                performance: lighthouse.categories.performance?.score || 0,
                seo: lighthouse.categories.seo?.score || 0,
                accessibility: lighthouse.categories.accessibility?.score || 0,
            },
            metrics: {
                fcp: lighthouse.audits['first-contentful-paint']?.displayValue,
                lcp: lighthouse.audits['largest-contentful-paint']?.displayValue,
                cls: lighthouse.audits['cumulative-layout-shift']?.displayValue,
            },
            issues: lighthouse.audits['meta-description']?.score === 0 ? ['Missing Meta Description'] : [],
            // In a real app, we'd parse more audits here
        });

    } catch (error) {
        console.error('Audit API Error:', error);
        return NextResponse.json({ error: 'Failed to complete audit. Ensure URL is public and valid.' }, { status: 500 });
    }
}
