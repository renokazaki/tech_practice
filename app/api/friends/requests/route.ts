//申請ステータスを取得
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

    // 受信した友達申請を取得
    const friendRequests = await prisma.friendRequest.findMany({
      where: {
        receiverId: currentUser.id,
        status: "pending",
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            img: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(friendRequests);
  } catch (error) {
    console.log("[FRIEND_REQUESTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
