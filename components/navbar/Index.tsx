import React from "react";
import { Teams } from "./Teams";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = (
  {
    // selectcategory,
    // setSelectCategory,
    // setTasks,
  }
) => {
  return (
    <nav className="flex justify-between items-center px-2 py-2">
      {/* Teams コンポーネント */}
      <Teams />
      {/* ユーザー名を表示 */}
      <div className="flex justify-center items-center gap-2">
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
