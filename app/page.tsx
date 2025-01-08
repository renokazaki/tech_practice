"use client";

import Form from "@/components/Form/Form";
import { List } from "@/components/list/List";
import Navbar from "@/components/navbar/Index";

import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

export default function Home() {
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

  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <div className="h-screen flex flex-col item-center">
        <Navbar />
        <ResizablePanelGroup
          className="h-full w-full border"
          direction="horizontal"
        >
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel>
                <div className="h-full flex flex-col justify-center p-6 space-y-4">
                  <div className="space-y-2">
                    <CardTitle>Create New Task</CardTitle>
                    <CardDescription>what do you to do today</CardDescription>
                  </div>

                  <Form setTasks={setTasks} />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>Charts</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel>
            <List tasks={tasks} setTasks={setTasks} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
