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
  const section = url.searchParams.get('section');
  const content = await prisma.propertyContent.findMany({ where: section ? { section } : {}, orderBy: [{ section: 'asc' }, { order: 'asc' }] });
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  const { id, section, title, description, imageUrl, order, isActive } = await req.json();
  if (!section || !title || !description) return NextResponse.json({ error: 'Section, title, description required' }, { status: 400 });
  if (id) { const u = await prisma.propertyContent.update({ where: { id }, data: { title, description, imageUrl, order: order || 0, isActive: isActive ?? true } }); return NextResponse.json(u); }
  const c = await prisma.propertyContent.create({ data: { section, title, description, imageUrl, order: order || 0, isActive: isActive ?? true } });
  return NextResponse.json(c, { status: 201 });
}

export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await prisma.propertyContent.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
