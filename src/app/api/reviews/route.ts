import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const bookingId = url.searchParams.get('bookingId');
  if (bookingId) { const r = await prisma.review.findUnique({ where: { bookingId } }); return NextResponse.json(r); }
  const reviews = await prisma.review.findMany({ include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' }, take: 50 });
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { bookingId, rating, comment } = await req.json();
  if (!bookingId || !rating || rating < 1 || rating > 5) return NextResponse.json({ error: 'Valid bookingId and rating (1-5) required' }, { status: 400 });
  const booking = await prisma.booking.findFirst({ where: { id: bookingId, userId: session.user.id } });
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  const review = await prisma.review.create({ data: { userId: session.user.id, bookingId, rating, comment } });
  return NextResponse.json(review, { status: 201 });
}
