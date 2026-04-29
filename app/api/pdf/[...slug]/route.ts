import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const filePath = params.slug.join('/');
  const token = process.env.SANITY_API_TOKEN;

  // Build both possible Sanity URL formats
 const sanityUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${filePath}`;

  console.log('Token present:', !!token);
  console.log('Token prefix:', token?.substring(0, 10));
  console.log('Fetching:', sanityUrl);

  try {
    // Try 1: with Bearer token
    const res1 = await fetch(sanityUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    console.log('With token status:', res1.status);

    if (res1.ok) {
      const buf = await res1.arrayBuffer();
      return new NextResponse(buf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline',
        },
      });
    }

    // Try 2: without token (some Sanity files are public)
    const res2 = await fetch(sanityUrl, { cache: 'no-store' });
    console.log('Without token status:', res2.status);

    if (res2.ok) {
      const buf = await res2.arrayBuffer();
      return new NextResponse(buf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline',
        },
      });
    }

    return new NextResponse(
      `File not found. Token present: ${!!token}. Status with token: ${res1.status}. Status without: ${res2.status}. URL: ${sanityUrl}`,
      { status: 404 }
    );

  } catch (error) {
    return new NextResponse(`Error: ${error}`, { status: 500 });
  }
}