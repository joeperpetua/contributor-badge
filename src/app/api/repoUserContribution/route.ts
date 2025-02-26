import { createSVG } from '@/app/_svgRenderer/repoUserBadge';
import { NextRequest, NextResponse } from 'next/server';
import { getRepoStars, getUserCommits, getUserPullRequests } from './_fetchGithub';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const contributor = searchParams.get('contributor');

    if (!owner || !repo || !contributor) {
      console.error('Bad request, missing params');
      return NextResponse.json({error: "Bad Request", message: "Missing owner, repo or contributor parameter."}, { status: 400 });
    }

    const [starCount, commitCount, prCount] = await Promise.all([
      getRepoStars(owner, repo), 
      getUserCommits(owner, repo, contributor), 
      getUserPullRequests(owner, repo, contributor)
    ]);

    const multiline = owner.length + repo.length < 23 ? false : true;
    const svg = await createSVG({ owner, repo, contributor, starCount, prCount, commitCount, multiline});

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