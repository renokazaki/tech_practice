import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // 選択したtaskを保持
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // ダイアログフラグ

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

  // ダブルクリックでタスクを選択し、ダイアログを開く
  const handleRowDoubleClick = (task: Task) => {
    setSelectedTask(task); // 選択されたタスクを設定
    setIsDialogOpen(true); // ダイアログを開く
  };

  //sort機能==========================================================================
  const [sortColumn, setSortColumn] = useState<keyof Task | null>(null); // ソート対象の列
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // ソート順

  const handleHeaderClick = (column: keyof Task) => {
    if (sortColumn === column) {
      // 同じ列を再度クリックした場合は並び順を切り替え
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // 別の列をクリックした場合は新しい列で昇順ソート
      setSortColumn(column);
      setSortOrder("asc");
    }

    // 並び替え処理
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setTasks(sortedTasks);
  };

  //=================================================================-

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
          {tasks.length > 0 ? (
            tasks.map((item, index) => (
              <TableRow
                key={index}
                onDoubleClick={() => handleRowDoubleClick(item)}
              >
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
