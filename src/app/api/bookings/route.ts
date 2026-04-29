import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const bookings = await prisma.booking.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' }, include: { review: true } });
  const favorites = await prisma.favorite.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ bookings, favorites });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { roomType, checkIn, checkOut, guests, totalPrice } = await req.json();
  if (!roomType || !checkIn || !checkOut) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const booking = await prisma.booking.create({ data: { userId: session.user.id, roomType, checkIn: new Date(checkIn), checkOut: new Date(checkOut), guests: guests || 2, totalPrice: parseFloat(totalPrice) || 0, status: 'pending' } });
  return NextResponse.json(booking, { status: 201 });
}
