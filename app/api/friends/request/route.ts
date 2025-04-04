//友達申請を送る
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const prismaClient = prisma as any;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { receiverId } = body;

    if (!receiverId) {
      return new NextResponse("Receiver ID is required", { status: 400 });
    }

    // 送信者のユーザー情報を取得
    const sender = await prisma.user.findUnique({
      where: { userId },
    });

    if (!sender) {
      return new NextResponse("Sender not found", { status: 404 });
    }

    // 既存の友達申請をチェック
    const existingRequest = await prismaClient.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: sender.id, receiverId },
          { senderId: receiverId, receiverId: sender.id },
        ],
      },
    });

    if (existingRequest) {
      return new NextResponse("Friend request already exists", { status: 400 });
    }

    // 友達申請を作成
    const friendRequest = await prismaClient.friendRequest.create({
      data: {
        senderId: sender.id,
        receiverId,
      },
    });

    return NextResponse.json(friendRequest);
  } catch (error) {
    console.log("[FRIEND_REQUEST_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
