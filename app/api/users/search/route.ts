import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return new NextResponse("Query parameter is required", { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        NOT: {
          userId: userId,
        },
      },
      take: 10,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_SEARCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
