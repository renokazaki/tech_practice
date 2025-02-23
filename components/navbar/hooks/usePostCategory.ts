import { Dispatch, SetStateAction, useState } from "react";

type UsePostCategoryProps = {
  onClose: () => void;
  setIsAddCategory: Dispatch<SetStateAction<boolean>>;
};

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/category/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategory,
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
    onClose();
    setNewCategory("");
  };

  return { onSubmit, newCategory, setNewCategory };
};
