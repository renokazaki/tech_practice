import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 現在のユーザーを取得
    const currentUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // 友達の投稿を取得
    const friendPosts = await prisma.task.findMany({
      where: {
        user: {
          friends: {
            some: {
              friendId: currentUser.id,
            },
          },
        },
        NOT: {
          userId: currentUser.id, // 自分の投稿を除外
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            img: true,
          },
        },
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(friendPosts);
  } catch (error) {
    console.log("[FRIEND_POSTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
