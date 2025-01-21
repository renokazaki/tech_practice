"use client";
// import Chart from "@/components/Chart/Chart";
import Form from "@/components/Form/Form";
import { List } from "@/components/list/List";
import Navbar from "@/components/navbar/Index";

import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col item-center">
        <Navbar />
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
                  <Form />
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
            <List />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
