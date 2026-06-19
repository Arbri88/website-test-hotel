import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { sendReviewNotificationEmail } from "@/lib/email";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const isAdmin = searchParams.get("admin") === "true";

    let reviews;
    if (isAdmin) {
      reviews = await prisma.review.findMany({
        include: {
          user: { select: { name: true, email: true } },
          room: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (roomId) {
      reviews = await prisma.review.findMany({
        where: { roomId },
        include: {
          user: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      reviews = await prisma.review.findMany({
        where: { userId: (session.user as any).id },
        include: {
          room: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
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
    const review = await prisma.review.create({
      data: {
        userId: (session.user as any).id,
        roomId: data.roomId,
        rating: parseInt(data.rating),
        comment: data.comment,
      },
      include: {
        user: true,
        room: true,
      },
    });

    // Notify admin
    sendReviewNotificationEmail(
      "admin@terrazzadisole.com",
      {
        userName: review.user.name || "Anonymous",
        roomName: review.room.name,
        rating: review.rating,
        comment: review.comment,
      }
    ).catch(console.error);

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get("id");

    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID required" },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    // Allow user to delete own review or admin to delete any
    const userRole = (session.user as any)?.role;
    if (review.userId !== (session.user as any).id && userRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.review.delete({ where: { id: reviewId } });

    return NextResponse.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
