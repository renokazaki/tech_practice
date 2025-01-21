import React, { useEffect, useState } from "react";

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

export const Teams = () => {
  const [category, setCategory] = useState<Category[]>([]); // データを保存するstate

  // APIからデータを取得==========================================================-
  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch("/api/category/get");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.details || "Failed to fetch data");
        }
        const data: { category: Category[] } = await response.json();
        setCategory(data.category);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    }

    fetchCategory();
  }, []);
  //==================================================================================

  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="all" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {category && category.length > 0 ? (
            category.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id.toString()}
                className="cursor-pointer border-b-2"
              >
                <div>{item.id}</div>
              </SelectItem>
            ))
          ) : (
            <div className="text-gray-500 px-4 py-2">No categories found</div>
          )}
          <CategoryAdd />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
