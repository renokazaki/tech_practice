import React, { Dispatch, SetStateAction } from "react";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Categories } from "./Categories";
import { Category } from "@/types/category";

const Header = ({
  selectCategory,
  setSelectCategory,
}: {
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
}) => {
  const { user } = useUser(); // Clerkからユーザー情報を取得

  return (
    <nav className="flex justify-between items-center px-2 py-2">
      <div className="flex items-center justify-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignOutButton redirectUrl="/sign-in" />
        </SignedOut>
        {user && (user.username || user.fullName || "User")}
      </div>

      {/* Categories コンポーネント */}
      <div className="flex items-end">
        <Categories
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
      </div>
    </nav>
  );
};

export default Header;
