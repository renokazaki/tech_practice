import React, { Dispatch, SetStateAction } from "react";
import { Categories } from "./Categories";
import { Category } from "@/types/category";

const Header = ({
  selectCategory,
  setSelectCategory,
}: {
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
}) => {
  return (
    <nav className="flex justify-end items-center px-2 pt-2">
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
