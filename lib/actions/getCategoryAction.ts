"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
// import { revalidatePath } from "next/cache";

export async function getCategoryAction() {
  // ユーザー認証情報を取得
  const { userId } = await auth();

  if (!userId) {
    console.error("ユーザーIDが取得できませんでした");
    return null;
  }

  try {
    const tasks = await prisma.category.findMany({
      where: {
        userId: {
          in: [userId],
        },
      },
   // revalidatePath("/");

    });
    return tasks;
  } catch (err) {
    console.error(err);
   
  }
}