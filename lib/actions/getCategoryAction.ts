"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function getCategoryAction() {
  // ユーザー認証情報を取得
  const { userId } = await auth();

  if (!userId) {
    console.error("ユーザーIDが取得できませんでした");
    return null;
  }

  try {
    const category = await prisma.category.findMany({
      where: {
        userId: {
          in: [userId],
        },
      },

    });
    return category;
  } catch (err) {
    console.error(err);
   
  }
}