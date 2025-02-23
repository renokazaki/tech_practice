import { Category } from "@/types/category";
import { Task } from "@/types/tasks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// フックの引数の型定義
type UseGetTaskProps = {
  selectCategory: Category;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  isAddTask: boolean;
};

type UseGetTaskReturn = {
  selectedTask: Task | null;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const useGetTask = ({
  selectCategory,
  setTasks,
  isAddTask,
}: UseGetTaskProps): UseGetTaskReturn => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // 選択したtaskを保持
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // ダイアログフラグ
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態
  // APIからデータを取得==========================================================-
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true); // データ取得開始
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
      } finally {
        setLoading(false); // データ取得完了
      }
    }

    fetchTasks();
  }, [isAddTask, selectCategory]); //タスク作成フラグまたは、選択しているカテゴリの値が変わった時にデータを再取得する

  return {
    selectedTask,
    setSelectedTask,
    isDialogOpen,
    setIsDialogOpen,
    loading,
  };
};
