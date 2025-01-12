"use client";

import React from "react";
import {
  Dialog as UIDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteTask, updateTask } from "@/lib/supabasefunction";

// Emergency と Status を型として定義
type Emergency = "low" | "middle" | "high";
type Status = "pending" | "in progress" | "done";

// Task の型定義
type Task = {
  id: number;
  title: string;
  description: string;
  emergency: Emergency;
  status: Status;
};

type DaialogProps = {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const Dialog: React.FC<DaialogProps> = ({
  selectedTask,
  setSelectedTask,
  isDialogOpen,
  setIsDialogOpen,
  setTasks,
}) => {
  const handleChange = (field: keyof Task, value: string) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, [field]: value });
    }
  };

  const handleSave = () => {
    const upadate = async () => {
      if (selectedTask) {
        // タスクの更新処理（例：Supabaseに更新リクエストを送る）
        await updateTask(selectedTask.id, selectedTask);
        setIsDialogOpen(false);
      }
    };
    // 更新処理を実行後編集後データ取得フラグの更新
    upadate();
  };

  const handleDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
      // 削除成功時、タスクをリストから削除
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask.id)
      );
      setIsDialogOpen(false); // ダイアログを閉じる
    }
  };

  return (
    <>
      {selectedTask && (
        <UIDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogDescription>詳細</DialogDescription>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-white">Title:</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="border p-2 w-full text-black"
                />
              </div>
              <div>
                <label className="text-white">Description:</label>
                <textarea
                  value={selectedTask.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="border p-2 w-full  text-black"
                />
              </div>
              <div>
                <label className="text-white">Emergency:</label>
                <select
                  value={selectedTask.emergency}
                  onChange={(e) => handleChange("emergency", e.target.value)}
                  className="border p-2 w-full  text-black"
                >
                  <option value="low">Low</option>
                  <option value="middle">Middle</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-white">Status:</label>
                <select
                  value={selectedTask.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="border p-2 w-full  text-black"
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogContent>
        </UIDialog>
      )}
    </>
  );
};

export default Dialog;
