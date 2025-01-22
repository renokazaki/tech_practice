import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
  const {userId} =await auth()
  console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { id } = body;    

    // Prismaを使用してデータを作成
    const activities = await prisma.category.create({
      data: {
        name: id, 
        userId: userId,
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true, data: activities }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (err) {
    // err が null または undefined の場合に対応
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error posting activities:', errorMessage);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to post activities', details: errorMessage }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
