import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    try {
        // 1. Fetch from Google Autocomplete (Client=chrome for JSON)
        const googleResponse = await fetch(
            `http://google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&hl=en-IN&gl=in`
        );

        if (!googleResponse.ok) {
            throw new Error('Failed to fetch from Google');
        }

        const data = await googleResponse.json();
        // data format: [query, [suggestions...], [ignore], [], {google:clientdata}]

        const suggestions: string[] = data[1] || [];

        // 2. Mock Search Intent Analysis
        // Real implementation would use an LLM or keyword database.
        // Here we use simple heuristics for the MVP.
        const results = suggestions.map(keyword => {
            let intent = 'Informational';
            const lower = keyword.toLowerCase();

            if (lower.includes('buy') || lower.includes('price') || lower.includes('deal') || lower.includes('sale')) {
                intent = 'Transactional';
            } else if (lower.includes('best') || lower.includes('review') || lower.includes('vs') || lower.includes('top')) {
                intent = 'Commercial';
            } else if (lower.includes('login') || lower.includes('signup') || lower.includes('download')) {
                intent = 'Navigational';
            }

            return {
                keyword,
                intent,
            };
        });

        return NextResponse.json({
            query,
            results: results.slice(0, 20) // Limit results
        });

    } catch (error) {
        console.error('Keyword API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch keywords' }, { status: 500 });
    }
}
