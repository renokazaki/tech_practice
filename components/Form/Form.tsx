/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Form as FormComp,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSchema from "./schema";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import StatusIcon from "../StatusIcon";
import { Textarea } from "../ui/textarea";
import EmergencyIcon from "../EmergencyIcon";
import { Button } from "../ui/button";
import { Category } from "@/types/category";

const Form = ({
  setIsAddTask,
  selectCategory,
  setSelectCategory,
}: {
  setIsAddTask: Dispatch<SetStateAction<boolean>>;
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
}) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      emergency: "low",
      status: "pending",
    },
  });

  // 初期ログイン時にのみカテゴリIDを取得し設定
  useEffect(() => {
    if (!selectCategory.id) {
      const fetchCategory = async () => {
        try {
          // カテゴリIDを取得
          const response = await fetch(`/api/category/get`);
          const result = await response.json();
          const category = result.category[0]; // category配列の最初の要素を取得
          console.log("初期", category.id);

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

  // サーバーへのデータ送信===========================================-
  const onSubmit = async (data: any) => {
    try {
      //以降2回目のpost処理===============================================================================
      // selectCategoryのIDをクエリパラメータとして追加
      const url = `/api/task/post?categoryId=${selectCategory.id}`;
      console.log("Received categoryId:", selectCategory.id);

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

  //==============================================================

  // isSubmittingを取得し送信中にボタンの非活性
  const { isSubmitting } = form.formState;

  return (
    <FormComp {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="block sm:flex items-center gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grow">
                <FormMessage />
                <FormControl>
                  <Input placeholder="what do you need to do?" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* emergency */}
          <FormField
            control={form.control}
            name="emergency"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="emergency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">
                        <EmergencyIcon emergency="low" />
                      </SelectItem>
                      <SelectItem value="middle">
                        <EmergencyIcon emergency="middle" />
                      </SelectItem>
                      <SelectItem value="high">
                        <EmergencyIcon emergency="high" />
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {/* status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="grow">
                <FormMessage />
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="pending">
                        <StatusIcon status="pending" />
                      </SelectItem>
                      <SelectItem value="in progress">
                        <StatusIcon status="in progress" />
                      </SelectItem>
                      <SelectItem value="done">
                        <StatusIcon status="done" />
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Textarea
                  className="text-xs resize-none"
                  placeholder="input description"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Add
        </Button>
      </form>
    </FormComp>
  );
};

export default Form;
