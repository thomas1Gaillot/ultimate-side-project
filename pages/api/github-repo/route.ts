// app/api/github-repo/index.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');

    if (!owner || !repo) {
        return NextResponse.json({ error: 'Missing owner or repo parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch repository information: ${response.statusText}`);
        }
        const repoInfo = await response.json();
        return NextResponse.json({ stars: repoInfo.stargazers_count, updatedAt: repoInfo.updated_at});
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
