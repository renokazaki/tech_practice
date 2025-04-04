import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { requestId } = body;

    if (!requestId) {
      return new NextResponse("Request ID is required", { status: 400 });
    }

    // 友達申請を取得
    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: requestId },
      include: {
        sender: true,
        receiver: true,
      },
    });

    if (!friendRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    // 申請の受信者であることを確認
    const receiver = await prisma.user.findUnique({
      where: { userId },
    });

    if (!receiver || receiver.id !== friendRequest.receiverId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // トランザクションで友達申請を承認し、友達関係を作成
    const result = await prisma.$transaction([
      // 友達申請のステータスを更新
      prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: "accepted" },
      }),
      // 友達関係を作成（双方向）
      prisma.friend.create({
        data: {
          userId: friendRequest.senderId,
          friendId: friendRequest.receiverId,
        },
      }),
      prisma.friend.create({
        data: {
          userId: friendRequest.receiverId,
          friendId: friendRequest.senderId,
        },
      }),
    ]);

    return NextResponse.json(result);
  } catch (error) {
    console.log("[FRIEND_ACCEPT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
