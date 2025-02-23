import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        ...(categoryId ? { categoryId } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks and categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks and categories" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
