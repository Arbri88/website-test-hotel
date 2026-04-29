import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const favs = await prisma.favorite.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(favs);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { roomType } = await req.json();
  if (!roomType) return NextResponse.json({ error: 'Room type required' }, { status: 400 });
  try { const f = await prisma.favorite.create({ data: { userId: session.user.id, roomType } }); return NextResponse.json(f, { status: 201 }); } catch { return NextResponse.json({ error: 'Already favorited' }, { status: 409 }); }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { roomType } = await req.json();
  await prisma.favorite.deleteMany({ where: { userId: session.user.id, roomType } });
  return NextResponse.json({ ok: true });
}
