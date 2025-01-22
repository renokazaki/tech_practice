import React, { Dispatch, SetStateAction, useEffect } from "react";

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
  // APIからデータを取得==========================================================-
  useEffect(() => {
    async function fetchTasks() {
      try {
        // selectCategoryのIDをクエリパラメータとして追加
        const url = `/api/task/get?categoryId=${selectCategory.id}`;

        const response = await fetch(url);
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
  }, [isAddTask, selectCategory]); //タスク作成フラグまたは、選択しているカテゴリの値が変わった時にデータを再取得する
  //==================================================================================

  return (
    <div className="overflow-y-auto h-full w-full">
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
            tasks.map((item, index) => (
              <TableRow key={index}>
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
