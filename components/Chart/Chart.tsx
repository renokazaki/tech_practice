import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Task } from "@/types/tasks";

type ListProps = {
  tasks: Task[];
};

// 必要なモジュールを登録する
ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartComponent: React.FC<ListProps> = ({ tasks }) => {
  // status のカウントを行う
  const statusCounts = tasks.reduce(
    (acc, task) => {
      if (task.status === "pending") acc.pending++;
      if (task.status === "in progress") acc.inProgress++;
      if (task.status === "done") acc.done++;
      return acc;
    },
    { pending: 0, inProgress: 0, done: 0 }
  );

  // Pie チャートのデータを定義
  const chartData = {
    labels: ["Pending", "In Progress", "Done"], // ラベル
    datasets: [
      {
        data: [
          statusCounts.pending,
          statusCounts.inProgress,
          statusCounts.done,
        ], // 各ステータスの数
        backgroundColor: ["#c7d2fe", "#6366f1", "#312e81"], // セクションの色

        weight: 100,
      },
    ],
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      {/* グラフのサイズを調整 */}
      <Pie data={chartData} />
    </div>
  );
};

export default ChartComponent;
