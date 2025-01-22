import React from "react";
import {
  Dialog as UIDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/tasks";

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
  //モーダルを開く処理=======================================================================
  const handleChange = (field: keyof Task, value: string) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, [field]: value });
    }
  };

  //更新用処理=======================================================================
  const handleSave = async () => {
    if (selectedTask) {
      try {
        const response = await fetch(
          `/api/task/put?selectedTaskId=${selectedTask.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedTask),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        // 成功レスポンスから更新済みタスクを取得
        const { data: updatedTask } = await response.json();

        // ローカルタスクリストを更新
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );

        setIsDialogOpen(false);
        toast.success("Task updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error updating task");
      }
    }
  };
  //==========================================================================

  //削除用処理=======================================================================

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        const response = await fetch(
          `/api/task/delete?selectedTaskId=${selectedTask.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask.id)
        );

        setIsDialogOpen(false);
        toast.success("Task deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error deleting task");
      }
    }
  };

  //==========================================================================

  return (
    <>
      <Toaster />
      {selectedTask && (
        <UIDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogDescription></DialogDescription>
            <DialogHeader>
              <DialogTitle>Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-white">Title:</label>
                <Input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label className="text-white">Description:</label>
                <Textarea
                  value={selectedTask.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="border p-2 w-full resize-none"
                />
              </div>
              <div>
                <label className="text-white">Emergency:</label>
                <Select
                  onValueChange={(value) => handleChange("emergency", value)}
                  defaultValue={selectedTask.emergency}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Emergency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="middle">Middle</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-white">Status:</label>
                <Select
                  onValueChange={(value) => handleChange("status", value)}
                  defaultValue={selectedTask.status}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-rose-500 text-white"
                >
                  Delete
                </Button>
                <Button
                  onClick={handleSave}
                  className="py-2 px-4 bg-sky-400 text-white"
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </UIDialog>
      )}
    </>
  );
};

export default Dialog;
