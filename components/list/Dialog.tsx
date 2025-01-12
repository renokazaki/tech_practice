"use client";

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
        await updateTask(selectedTask.id, selectedTask);
        setIsDialogOpen(false);
      }
    };
    upadate();
    toast.success("Task updated successfully!");
  };

  const handleDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask.id)
      );
      setIsDialogOpen(false);
      toast.success("Task deleted successfully!");
    }
  };

  return (
    <>
      <Toaster />
      {selectedTask && (
        <UIDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogDescription>Edit</DialogDescription>
            <DialogHeader>
              <DialogTitle>Description</DialogTitle>
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
