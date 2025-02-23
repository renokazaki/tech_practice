import { Dispatch, SetStateAction, useState } from "react";

// フックの引数の型定義
type UsePostCategoryProps = {
  onClose: () => void;
  setIsAddCategory: Dispatch<SetStateAction<boolean>>;
};

// フックの戻り値の型定義
type UsePostCategoryReturn = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  newCategory: string;
  setNewCategory: Dispatch<SetStateAction<string>>;
};

export const usePostCategory = ({
  onClose,
  setIsAddCategory,
}: UsePostCategoryProps): UsePostCategoryReturn => {
  const [newCategory, setNewCategory] = useState("");

  // サーバーへのデータ送信
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/category/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategory, // APIに渡すデータ
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
      } else {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsAddCategory((prev) => !prev);
    onClose(); // モーダルを閉じる
    setNewCategory(""); // 入力フィールドをクリア
  };

  return { onSubmit, newCategory, setNewCategory };
};
