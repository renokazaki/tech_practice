import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Task } from "@/types/tasks";

type ListProps = {
  tasks: Task[];
};

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartComponent: React.FC<ListProps> = ({ tasks }) => {
  const statusCounts = tasks.reduce(
    (acc, task) => {
      if (task.status === "pending") acc.pending++;
      if (task.status === "in progress") acc.inProgress++;
      if (task.status === "done") acc.done++;
      return acc;
    },
    { pending: 0, inProgress: 0, done: 0 }
  );

  const chartData = {
    labels: ["Pending", "In Progress", "Done"],
    datasets: [
      {
        data: [
          statusCounts.pending,
          statusCounts.inProgress,
          statusCounts.done,
        ],
        backgroundColor: ["#c7d2fe", "#6366f1", "#312e81"],

        weight: 100,
      },
    ],
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Pie data={chartData} />
    </div>
  );
};

export default ChartComponent;
