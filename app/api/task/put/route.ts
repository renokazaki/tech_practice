import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 } // 認証エラー
      );
    }

    const body = await request.json();
    const { title, description, emergency, status } = body;

    // URLからtaskIdを取得
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("selectedTaskId");

    if (!taskId || !title || !description || !emergency || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 更新対象のタスクが存在するかを確認
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    // ユーザーが所有するタスクか確認
    if (existingTask.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to update this task" },
        { status: 403 }
      );
    }

    // タスクを更新
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        emergency,
        status,
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true, data: updatedTask }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error updating task:", errorMessage);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update task", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
