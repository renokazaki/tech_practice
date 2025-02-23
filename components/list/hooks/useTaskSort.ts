import { Task } from "@/types/tasks";
import { Dispatch, SetStateAction, useState } from "react";

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
  const [sortColumn, setSortColumn] = useState<keyof Task | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleHeaderClick = (column: keyof Task) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }

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
