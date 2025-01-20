"use client";
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "../ui/button";
import CategoryDialog from "./CategoryDialog";
const CategoryAdd = () => {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <div>
      <Button className="w-[180px] mt-2" onClick={() => setIsAdd(true)}>
        <PlusIcon className=" flex justify-center " />
        create category
      </Button>
      <CategoryDialog isAdd={isAdd} onClose={() => setIsAdd(false)} />
    </div>
  );
};

export default CategoryAdd;
