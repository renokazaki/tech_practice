import React from "react";
import Teams from "./Teams";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </nav>
  );
};

export default Navbar;
