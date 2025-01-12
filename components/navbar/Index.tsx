import React from "react";
import Teams from "./Teams";

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

type CategoryProps = {
  selectcategory: string;
  setSelectCategory: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};
const Navbar: React.FC<CategoryProps> = ({
  selectcategory,
  setSelectCategory,
  setTasks,
}) => {
  return (
    <nav className="flex justify-between items-center px-2 py-2 ">
      <Teams
        selectCategory={selectcategory}
        setSelectCategory={setSelectCategory}
        setTasks={setTasks}
      />
    </nav>
  );
};

export default Navbar;
