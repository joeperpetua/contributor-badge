import { createSVG } from '@/app/_svgRenderer/repoUserBadge';
import { NextRequest, NextResponse } from 'next/server';
import { getRepoStars, getUserCommits, getUserPullRequests } from './_fetchGithub';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const user = searchParams.get('user');

    if (!owner || !repo || !user) {
      console.error('Bad request, missing params');
      return NextResponse.json({error: "Bad Request", message: "Missing owner, repo or user parameter."}, { status: 400 });
    }

    const [repoData, commitCount, prCount] = await Promise.all([
      getRepoStars(owner, repo), 
      getUserCommits(owner, repo, user), 
      getUserPullRequests(owner, repo, user)
    ]);

    const multiline = owner.length + repo.length < 23 ? false : true;
    const svg = await createSVG({ owner: repoData.owner, repo: repoData.repo, user, starCount: repoData.stars, prCount, commitCount, multiline});

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (error) {
    console.error('Error generating badge:', error);
    return NextResponse.json({error: 'Internal Server Error', message: 'Error while generating badge.'}, { status: 500 });
  }
}