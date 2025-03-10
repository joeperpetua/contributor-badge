import { createSVG } from '@/app/_svgRenderer/repoUserBadge';
import { NextRequest, NextResponse } from 'next/server';
import { getRepoStars, getUserCommits, getUserPullRequests } from './_fetchGithub';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const user = searchParams.get('user');
    const themeOptions = {
      theme: searchParams.get('theme'),
      borderRadius: searchParams.get('borderRadius'),
      transparent: searchParams.get('transparent')?.toLowerCase() === 'true' ? true : false, // default false
      showOwner: searchParams.get('showOwner')?.toLowerCase() === 'false' ? false : true, // default true
      fontStyle: searchParams.get('fontStyle'),
      animation: searchParams.get('animation')
    };

    if (!owner || !repo || !user) {
      console.error('Bad request, missing params');
      return NextResponse.json({error: "Bad Request", message: "Missing owner, repo or user parameter."}, { status: 400 });
    }

    const [repoData, commitCount, prCount] = await Promise.all([
      getRepoStars(owner, repo), 
      getUserCommits(owner, repo, user), 
      getUserPullRequests(owner, repo, user)
    ]);

    const multiline = owner.length + repo.length > 22 && themeOptions.showOwner ? true : false;
    const svg = await createSVG({ owner: repoData.owner, repo: repoData.repo, user, starCount: repoData.stars, prCount, commitCount, multiline, themeOptions});

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Error while generating badge', message: `${error}`}, { status: 500 });
  }
}