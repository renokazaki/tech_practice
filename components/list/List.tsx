"use client";

import React, { useState } from "react";
import {
  getAllSortTask,
  getAlltask,
  getCategorySortTask,
  getCategorytask,
} from "@/lib/supabasefunction";
import { useEffect } from "react";

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
import Dialog from "./Dialog";

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

type ListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  selectcategory: string;
};

export const List: React.FC<ListProps> = ({
  tasks,
  setTasks,
  selectcategory,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortFlag, setSortFlag] = useState(false);

  const handleDoubleClick = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    // タスクを取得する関数
    const fetchAllTask = async () => {
      try {
        let alltask;
        // カテゴリがallまたは1の場合は全てのタスクを取得
        if (selectcategory === "all" || selectcategory === "1") {
          alltask = await getAlltask(1);
        } else {
          alltask = await getCategorytask(selectcategory);
        }
        if (alltask.data) {
          // データをStateに設定
          setTasks(alltask.data as Task[]);
        } else {
          console.error("タスクの取得に失敗しました:", alltask.error); // エラーをログ出力
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };
    // fetchAllTaskを呼び出す
    fetchAllTask();
  }, [isDialogOpen]);

  //タスクを並び替え
  const handleSort = async (value: string) => {
    let sortTask;
    setSortFlag(!sortFlag);
    // カテゴリがallまたは1の場合は全てのタスクを取得
    if (selectcategory === "all" || selectcategory === "1") {
      sortTask = await getAllSortTask(1, value, sortFlag);
    } else {
      sortTask = await getCategorySortTask(selectcategory, value, sortFlag);
    }
    if (sortTask.data) {
      setTasks(sortTask.data as Task[]);
    } else {
      console.error("タスクの取得に失敗しました:", sortTask.error); // エラーをログ出力
    }
  };

  return (
    <div className="overflow-auto h-full w-full">
      {/* 親コンテナにスクロール設定 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={(e) => handleSort(e.currentTarget.textContent || "")}
            >
              Title
            </TableHead>
            <TableHead
              onClick={(e) => handleSort(e.currentTarget.textContent || "")}
            >
              Emergency
            </TableHead>
            <TableHead
              onClick={(e) => handleSort(e.currentTarget.textContent || "")}
            >
              Status
            </TableHead>
            <TableHead
              onClick={(e) => handleSort(e.currentTarget.textContent || "")}
            >
              Description
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((item) => (
            <TableRow
              key={item.id}
              onDoubleClick={() => handleDoubleClick(item)}
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
          ))}
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
