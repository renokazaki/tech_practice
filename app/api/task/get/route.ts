import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
  const {userId} =await auth()

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    // URLからcategoryIdを取得
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    // ユーザーに紐づくタスクとカテゴリを取得
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        ...(categoryId ? { categoryId } : {}), // categoryIdが存在する場合のみ条件に追加
      },
      orderBy: {
        createdAt: 'desc', // 作成日時の降順でソート
      },
    });
    console.log("Tasks fetched:", tasks);


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