import { toast } from "sonner";
import { Task } from "@/types/tasks";

// フックの引数の型定義
type UseHandleDialogProps = {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type UseHandleDialogReturn = {
  handleChange: (field: keyof Task, value: string) => void;
  handleSave: () => Promise<void>;
  handleDelete: () => Promise<void>;
};

export const useHandleDialog = ({
  selectedTask,
  setSelectedTask,
  setIsDialogOpen,
  setTasks,
}: UseHandleDialogProps): UseHandleDialogReturn => {
  //モーダルを開く処理=======================================================================
  const handleChange = (field: keyof Task, value: string) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, [field]: value });
    }
  };

  //更新用処理=======================================================================
  const handleSave = async () => {
    if (selectedTask) {
      try {
        const response = await fetch(
          `/api/task/put?selectedTaskId=${selectedTask.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedTask),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        // 成功レスポンスから更新済みタスクを取得
        const { data: updatedTask } = await response.json();

        // ローカルタスクリストを更新
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );

        setIsDialogOpen(false);
        toast.success("Task updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error updating task");
      }
    }
  };
  //==========================================================================

  //削除用処理=======================================================================

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        const response = await fetch(
          `/api/task/delete?selectedTaskId=${selectedTask.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask.id)
        );

        setIsDialogOpen(false);
        toast.success("Task deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error deleting task");
      }
    }
  };

  return { handleChange, handleSave, handleDelete };
};
