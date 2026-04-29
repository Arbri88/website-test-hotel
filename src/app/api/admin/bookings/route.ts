import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

async function isAdmin() {
  const s = await auth();
  return s?.user && (s.user as any).role === 'admin';
}

export async function GET(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const bookings = await prisma.booking.findMany({ where: status ? { status: status as any } : {}, include: { user: { select: { name: true, email: true } } }, orderBy: { createdAt: 'desc' } });
  const stats = { total: bookings.length, pending: bookings.filter((b: any) => b.status === 'pending').length, confirmed: bookings.filter((b: any) => b.status === 'confirmed').length, completed: bookings.filter((b: any) => b.status === 'completed').length, cancelled: bookings.filter((b: any) => b.status === 'cancelled').length, revenue: bookings.filter((b: any) => b.paymentStatus === 'paid').reduce((s: number, b: any) => s + b.totalPrice, 0) };
  return NextResponse.json({ bookings, stats });
}

export async function PATCH(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  const { id, status, paymentStatus } = await req.json();
  if (!id) return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
  const updated = await prisma.booking.update({ where: { id }, data: { ...(status && { status }), ...(paymentStatus && { paymentStatus }) } });
  return NextResponse.json(updated);
}
