import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { name, email: email.toLowerCase(), phone, passwordHash, role: 'user' }, select: { id: true, name: true, email: true, role: true } });
    return NextResponse.json(user, { status: 201 });
  } catch { return NextResponse.json({ error: 'Registration failed' }, { status: 500 }); }
}
