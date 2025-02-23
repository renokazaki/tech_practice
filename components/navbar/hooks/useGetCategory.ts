import { Category } from "@/types/category";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type UseGetCategory = {
  category: Category[];
  setIsAddCategory: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const useGetCategory = (): UseGetCategory => {
  const [category, setCategory] = useState<Category[]>([]);
  const [isAddCategory, setIsAddCategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchCategory() {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchCategory();
  }, [isAddCategory]);
  return { category, setIsAddCategory, loading };
};
