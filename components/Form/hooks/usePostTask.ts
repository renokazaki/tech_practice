import { Category } from "@/types/category";
import { Dispatch, SetStateAction, useEffect } from "react";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSchema, { FormSchema as FormSchemaType } from "../schema";

type UsePostTaskProps = {
  selectCategory: Category;
  setIsAddTask: Dispatch<SetStateAction<boolean>>;
};
type UsePostTaskReturn = {
  onSubmit: (data: FormSchemaType) => Promise<void>;
  form: UseFormReturn<FormSchemaType>;
  isSubmitting: boolean;
};

export const usePostTask = ({
  selectCategory,
  setIsAddTask,
}: UsePostTaskProps): UsePostTaskReturn => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      emergency: "low",
      status: "pending",
    },
  });

  const { isSubmitting } = form.formState;

  // サーバーへのデータ送信===========================================-
  const onSubmit = async (data: FormSchemaType) => {
    try {
      //以降2回目のpost処理===============================================================================
      // selectCategoryのIDをクエリパラメータとして追加
      const url = `/api/task/post?categoryId=${selectCategory.id}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
      } else {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        form.reset(); // フォームをリセット
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("フォーム送信に失敗しました");
    }
    setIsAddTask((prev) => !prev);
  };

  // フォームリセット用のuseEffect
  useEffect(() => {
    if (isSubmitting) {
      return;
    }
    form.reset({
      title: "",
      description: "",
      emergency: "low",
      status: "pending",
    });
  }, [isSubmitting, form]);

  return {
    onSubmit,
    form,
    isSubmitting,
  };
};
