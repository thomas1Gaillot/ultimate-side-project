// lib/github.ts
import fetch from 'node-fetch';

export async function fetchRepoInfo(owner: string, repo: string) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch repository information: ${response.statusText}`);
    }
    return response.json();
}
