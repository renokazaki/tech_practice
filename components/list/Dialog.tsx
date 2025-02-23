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
import StatusIcon from "../StatusIcon";
import EmergencyIcon from "../EmergencyIcon";
import { useHandleDialog } from "./hooks/useHandleDialog";

type DialogProps = {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const Dialog: React.FC<DialogProps> = ({
  selectedTask,
  setSelectedTask,
  isDialogOpen,
  setIsDialogOpen,
  setTasks,
}) => {
  //==========================================================================

  const { handleChange, handleSave, handleDelete } = useHandleDialog({
    selectedTask,
    setSelectedTask,
    setIsDialogOpen,
    setTasks,
  });

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
                    <SelectItem value="low">
                      <EmergencyIcon emergency="low" />
                    </SelectItem>
                    <SelectItem value="middle">
                      <EmergencyIcon emergency="middle" />
                    </SelectItem>
                    <SelectItem value="high">
                      <EmergencyIcon emergency="high" />
                    </SelectItem>
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
                    <SelectItem value="pending">
                      <StatusIcon status="pending" />
                    </SelectItem>
                    <SelectItem value="in progress">
                      <StatusIcon status="in progress" />
                    </SelectItem>
                    <SelectItem value="done">
                      <StatusIcon status="done" />
                    </SelectItem>
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
