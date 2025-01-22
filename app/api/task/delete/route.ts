import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // URLからtaskIdを取得
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("selectedTaskId");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    // ユーザーが所有するタスクか確認
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    if (existingTask.id !== taskId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this task" },
        { status: 403 }
      );
    }

    // タスクを削除
    await prisma.task.delete({
      where: { id: taskId },
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: "Task deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error deleting task:", errorMessage);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete task", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
