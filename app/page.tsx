"use client";
// import Chart from "@/components/Chart/Chart";
import Form from "@/components/Form/Form";
import { List } from "@/components/list/List";
import Navbar from "@/components/navbar/navbar";

import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Category } from "@/types/category";
// import { Task } from "@/types/tasks";
import { useState } from "react";

export default function Home() {
  //formからtask追加フラグ
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  //navbarでカテゴリ選択管理
  const [selectCategory, setSelectCategory] = useState<Category>({
    id: "all", // 初期値として "all" を設定
    userId: "", // apiで設定する
  });

  // const [tasks, setTasks] = useState<Task[]>([]); // データを保存するstate

  return (
    <>
      <div className="h-screen w-screen flex flex-col item-center">
        <Navbar
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
        <ResizablePanelGroup
          className="h-full w-full flex flex-col sm:flex-row border"
          direction="horizontal"
        >
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel>
                <div className="h-full flex flex-col justify-center p-6 space-y-4">
                  <div className="space-y-2 hidden sm:block">
                    <CardTitle>Create New Task</CardTitle>
                    <CardDescription>what do you to do today</CardDescription>
                  </div>
                  <Form
                    setIsAddTask={setIsAddTask}
                    selectCategory={selectCategory}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="hidden sm:block">
                {/* <Chart tasks={tasks} /> */}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel>
            <List isAddTask={isAddTask} selectCategory={selectCategory} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
