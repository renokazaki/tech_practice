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

    // ユーザーに紐づくタスクとカテゴリを取得
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    //   include: {
    //     category: true, // カテゴリ情報も含める
    //   },
      orderBy: {
        createdAt: 'desc', // 作成日時の降順でソート
      },
    });
    console.log("Tasks fetched:", tasks);

    // // ユーザーに紐づくカテゴリを取得
    // const categories = await prisma.category.findMany({
    //   where: {
    //     userId: userId,
    //   },
    //   include: {
    //     tasks: {
    //       select: {
    //         id: true,
    //         title: true,
    //         status: true,
    //         emergency: true,
    //       },
    //     },
    //   },
    // });

    return NextResponse.json({
      tasks,
    //   categories,
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