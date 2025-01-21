import React, { useEffect, useState } from "react";

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

export const List = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // データを保存するstate

  // APIからデータを取得==========================================================-
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/task/get");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.details || "Failed to fetch data");
        }
        const data: { tasks: Task[] } = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    }

    fetchTasks();
  }, []);
  //==================================================================================

  return (
    <div className="overflow-y-auto h-full w-full">
      {/* 親コンテナにスクロール設定 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Emergency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((item) => (
              <TableRow key={item.id}>
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

      {/* <Dialog
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setTasks={setTasks}
      /> */}
    </div>
  );
};
