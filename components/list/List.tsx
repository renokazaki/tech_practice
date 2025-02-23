import React, { Dispatch, SetStateAction } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmergencyIcon from "../EmergencyIcon";
import StatusIcon from "../StatusIcon";
import { Task } from "@/types/tasks";
import { Category } from "@/types/category";
import Dialog from "./Dialog";
import { Button } from "../ui/button";
import { useGetTask } from "./hooks/useGetTask";
import { useTaskSort } from "./hooks/useTaskSort";
export const List = ({
  isAddTask,
  selectCategory,
  tasks,
  setTasks,
}: {
  isAddTask: boolean;
  selectCategory: Category;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  const {
    selectedTask,
    setSelectedTask,
    isDialogOpen,
    setIsDialogOpen,
    loading,
  } = useGetTask({ selectCategory, setTasks, isAddTask });

  const { handleHeaderClick } = useTaskSort({
    tasks,
    setTasks,
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  return (
    <div className="overflow-y-auto h-full w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleHeaderClick("title")}>
              <Button className="w-full">Title ↑↓</Button>
            </TableHead>
            <TableHead onClick={() => handleHeaderClick("emergency")}>
              <Button className="w-full">Emergency ↑↓</Button>
            </TableHead>
            <TableHead onClick={() => handleHeaderClick("status")}>
              <Button className="w-full">Status ↑↓</Button>
            </TableHead>
            <TableHead onClick={() => handleHeaderClick("description")}>
              <Button className="w-full">Description ↑↓</Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>Loading...</TableCell>
            </TableRow>
          ) : tasks.length > 0 ? (
            tasks.map((item, index) => (
              <TableRow key={index} onClick={() => handleTaskClick(item)}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <EmergencyIcon emergency={item.emergency} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={item.status} />
                </TableCell>
                <TableCell colSpan={3}>{item.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No tasks added</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setTasks={setTasks}
      />
    </div>
  );
};
