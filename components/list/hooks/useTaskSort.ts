import { Task } from "@/types/tasks";
import { Dispatch, SetStateAction, useState } from "react";

// フックの引数の型定義
type UseTaskSortProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

type UseTaskSortReturn = {
  handleHeaderClick: (column: keyof Task) => void;
};

export const useTaskSort = ({
  tasks,
  setTasks,
}: UseTaskSortProps): UseTaskSortReturn => {
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

  return {
    handleHeaderClick,
  };
};
