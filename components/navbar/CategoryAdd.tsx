"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "../ui/button";
import CategoryDialog from "./CategoryDialog";
const CategoryAdd = ({
  setIsAddCategory,
}: {
  setIsAddCategory: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <div>
      <Button className="w-[180px] mt-2" onClick={() => setIsAdd(true)}>
        <PlusIcon className=" flex justify-center " />
        create category
      </Button>
      <CategoryDialog
        isAdd={isAdd}
        onClose={() => setIsAdd(false)}
        setIsAddCategory={setIsAddCategory}
      />
    </div>
  );
};

export default CategoryAdd;
