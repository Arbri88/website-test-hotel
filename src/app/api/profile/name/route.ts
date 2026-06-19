import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name } = await req.json();
    if (!name || !name.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const user = await prisma.user.update({
      where: { id: (session.user as any).id },
      data: { name: name.trim() },
    });

    return NextResponse.json({ name: user.name });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
