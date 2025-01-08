"use client";

import React from "react";
import { gettask } from "@/lib/supabasefunction";
import { useEffect } from "react";
import StatusIcon from "../StatusIcon";
import EmergencyIcon from "../EmergencyIcon";
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
    <div>
      <div>
        {tasks.map((item) => {
          return (
            <div key={item.id}>
              <div className="flex justify-between">
                {item.title}
                <EmergencyIcon emergency={item.emergency} />
                <StatusIcon status={item.status} />
              </div>
              <div>{item.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
