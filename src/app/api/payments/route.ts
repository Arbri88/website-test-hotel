import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { bookingId, method } = await req.json();
  if (!bookingId) return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
  const booking = await prisma.booking.findFirst({ where: { id: bookingId, userId: session.user.id } });
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  const updated = await prisma.booking.update({ where: { id: bookingId }, data: { paymentStatus: 'paid', status: 'confirmed' } });
  return NextResponse.json({ booking: updated, payment: { status: 'paid', method: method || 'demo', transactionId: `demo-tx-${Date.now()}`, message: 'Demo mode — integrate Stripe for production.' } });
}
