import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
  try {
  const {userId} =await auth()

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // ユーザーに紐づくカテゴリを取得
    const category = await prisma.category.findMany({
      where: {
        userId: userId,
      },
    });
    console.log("Category fetched:", category);

 

    return NextResponse.json({
      category,
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