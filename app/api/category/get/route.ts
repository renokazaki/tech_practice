import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  let prismaConnection = false;

  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    prismaConnection = true;

    const categories = await prisma.category.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });

    return new NextResponse(JSON.stringify({ category: categories }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    if (prismaConnection) {
      await prisma.$disconnect();
    }
  }
}
