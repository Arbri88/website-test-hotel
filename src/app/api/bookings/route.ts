import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    let bookings;
    if (isAdmin && (session.user as any)?.role === "admin") {
      bookings = await prisma.booking.findMany({
        include: {
          user: { select: { name: true, email: true } },
          room: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      bookings = await prisma.booking.findMany({
        where: { userId: (session.user as any).id },
        include: {
          room: { select: { name: true, images: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const room = await prisma.room.findUnique({
      where: { id: data.roomId },
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    const nights = Math.ceil(
      (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalPrice = nights * room.price;

    const booking = await prisma.booking.create({
      data: {
        userId: (session.user as any).id,
        roomId: data.roomId,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: parseInt(data.guests),
        totalPrice,
        status: "confirmed",
        paymentStatus: "pending",
      },
      include: {
        room: true,
        user: true,
      },
    });

    // Send confirmation email
    sendBookingConfirmationEmail(
      booking.user.email,
      booking.user.name || "Guest",
      {
        roomName: booking.room.name,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        bookingId: booking.id,
      }
    ).catch(console.error);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
