import React, { Dispatch, SetStateAction } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Teams } from "./Teams";
import { Category } from "@/types/category";

const Navbar = ({
  selectCategory,
  setSelectCategory,
}: {
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
}) => {
  return (
    <nav className="flex justify-between items-center px-2 py-2">
      <div className="flex items-start">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>

      {/* Teams コンポーネント */}
      <div className="flex items-end">
        <Teams
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
      </div>
    </nav>
  );
};

export default Navbar;
