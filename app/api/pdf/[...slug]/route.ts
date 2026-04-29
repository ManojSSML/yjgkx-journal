import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const filePath = params.slug.join('/');
  const sanityUrl = `https://cdn.sanity.io/files/jo6fxsyw/production/${filePath}`;

  try {
    const response = await fetch(sanityUrl);

    if (!response.ok) {
      return new NextResponse('File not found', { status: 404 });
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching file', { status: 500 });
  }
}