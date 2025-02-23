import React, { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryAdd from "./CategoryAdd";
import { Category } from "@/types/category";
import { useGetCategory } from "./hooks/useGetCategory";

export const Categories = ({
  selectCategory,
  setSelectCategory,
}: {
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
}) => {
  //==================================================================================

  const { category, setIsAddCategory, loading } = useGetCategory();

  return (
    <Select
      value={selectCategory.name}
      onValueChange={(value) => {
        const selectedCategory = category.find(
          (item: Category) => item.name === value
        );
        if (selectedCategory) {
          setSelectCategory(selectedCategory); // 選択したカテゴリをセット
        }
      }}
    >
      <SelectTrigger className="w-[150px]">
        {loading ? (
          <div className="text-white">Loading...</div> // ローディング中の表示
        ) : (
          <SelectValue placeholder="task" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {category && category.length > 0 ? (
            category.map((item: Category) => (
              <SelectItem
                key={item.id}
                value={item.name}
                className="cursor-pointer border-b-2"
              >
                <div>{item.name}</div>
              </SelectItem>
            ))
          ) : (
            <div className="text-gray-500 px-4 py-2">No categories found</div>
          )}
          <CategoryAdd setIsAddCategory={setIsAddCategory} />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
