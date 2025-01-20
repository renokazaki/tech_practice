import React from "react";
import Teams from "./Teams";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

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
  const { user } = useUser();

  // ローディング状態の処理
  if (!user) {
    return <p>Loading...</p>;
  }

  // ユーザー名を取得
  const userName = user.username || "No username set";

  return (
    <nav className="flex justify-between items-center px-2 py-2">
      {/* Teams コンポーネント */}
      <Teams
        selectCategory={selectcategory}
        setSelectCategory={setSelectCategory}
        setTasks={setTasks}
      />
      {/* ユーザー名を表示 */}
      <div className="flex justify-center items-center gap-2">
        {userName}
        {/* サインイン状態に応じたボタンを表示 */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
