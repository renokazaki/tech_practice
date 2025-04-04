"use client";
import Chart from "@/components/Chart/Chart";
import Form from "@/components/Form/Form";
import { List } from "@/components/list/List";
import Header from "@/components/navbar/Header";

import { Category } from "@/types/category";
import { Task } from "@/types/tasks";
import { useState } from "react";

export default function Home() {
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<Category>({
    id: "",
    name: "task",
    userId: "",
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="h-full w-screen flex flex-col overflow-hidden">
      <Header
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />

      <div className="hidden lg:flex flex-row flex-1 min-h-0">
        <div className="w-1/3 flex flex-col min-h-0">
          <div className="flex-none h-1/3 p-4 border-b">
            <div className="h-full flex flex-col justify-center items-center">
              <Form
                setIsAddTask={setIsAddTask}
                selectCategory={selectCategory}
                setSelectCategory={setSelectCategory}
              />
            </div>
          </div>

          <div className="flex-none h-2/3 p-4">
            <div className="h-full flex justify-center items-center">
              <Chart tasks={tasks} />
            </div>
          </div>
        </div>

        <div className="w-2/3 overflow-y-auto p-4">
          <List
            isAddTask={isAddTask}
            selectCategory={selectCategory}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>

      <div className="lg:hidden flex flex-col flex-1 min-h-0">
        <div className="flex-none w-full p-4">
          <div className="w-full max-w-3xl mx-auto">
            <Form
              setIsAddTask={setIsAddTask}
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <List
            isAddTask={isAddTask}
            selectCategory={selectCategory}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
    </div>
  );
}
