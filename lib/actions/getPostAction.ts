"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function getPostAction() {
  // ユーザー認証情報を取得
  const { userId } = await auth();

  if (!userId) {
    console.error("ユーザーIDが取得できませんでした");
    return null;
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: {
          in: [userId],
        },
      },
      include: {
        category: true,
      },
    });

    return tasks;
  } catch (err) {
    console.error(err);
   
  }
}