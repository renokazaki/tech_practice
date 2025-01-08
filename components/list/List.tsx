"use client";

import React from "react";
import { gettask } from "@/lib/supabasefunction";
import { useEffect } from "react";
// import StatusIcon from "../StatusIcon";
// import EmergencyIcon from "../EmergencyIcon";

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
};

export const List: React.FC<ListProps> = ({ tasks, setTasks }) => {
  useEffect(() => {
    // タスクを取得する関数
    const fetchAllTask = async () => {
      try {
        const alltask = await gettask();
        if (alltask.data) {
          // データをStateに設定
          setTasks(alltask.data as Task[]);
          console.log("取得したタスク:", alltask.data); // デバッグ用
        } else {
          console.error("タスクの取得に失敗しました:", alltask.error); // エラーをログ出力
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };
    // fetchAllTaskを呼び出す
    fetchAllTask();
  }, []);

  return (
    <div className="overflow-auto h-full w-full">
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
          {tasks.map((item) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
