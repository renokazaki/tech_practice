import { Category } from "@/types/category";
import { Dispatch, SetStateAction, useEffect } from "react";

type UseFirstGetCategoryProps = {
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
};

export const useFirstGetCategory = ({
  selectCategory,
  setSelectCategory,
}: UseFirstGetCategoryProps): void => {
  // 初期ログイン時にのみカテゴリIDを取得し設定
  useEffect(() => {
    if (!selectCategory.id) {
      const fetchCategory = async () => {
        try {
          // カテゴリIDを取得
          const response = await fetch(`/api/category/get`);
          const result = await response.json();
          const category = result.category[0]; // category配列の最初の要素を取得
          // console.log("初期", category.id);

          // 親コンポーネントの状態を更新
          setSelectCategory((prev) => ({
            ...prev, // 現在の状態のプロパティを保持
            id: category.id, // idのみを更新
          }));

          if (!category.id) {
            throw new Error("Category ID not found");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };

      fetchCategory();
    }
  }, []);
};
