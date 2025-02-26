import { createSVG } from '@/app/_svgRenderer/repoUserBadge';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const owner = searchParams.get('owner') || '';
    const repo = searchParams.get('repo') || '';
    const contributor = searchParams.get('contributor') || '';
    const multiline = owner.length + repo.length < 24 ? false : true;

    const svg = await createSVG({ owner, repo, contributor, multiline});

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (error) {
    console.error('Error generating SVG:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}