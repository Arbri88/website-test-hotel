import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        reviews: true,
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const room = await prisma.room.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        images: data.images || "[]",
        amenities: data.amenities || "[]",
        capacity: parseInt(data.capacity),
      },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}
