/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
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
import { addPostAction } from "@/lib/actions/addPostAction";
import { getCategory } from "@/lib/supabasefunction";

interface Category {
  id: string;
  userid: string;
}

const Form = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  //カテゴリの取得
  useEffect(() => {
    // useEffect でカテゴリーを非同期取得
    const fetchCategories = async () => {
      const response = await getCategory(); // getCategory の結果を取得

      // response.data にカテゴリーが格納されていることを想定している
      if (response && response.data) {
        setCategories(response.data); // データをステートにセット
      } else {
        setCategories([]); // エラー時には空配列をセット
      }
    };

    fetchCategories(); // カテゴリー取得関数を実行
  }, []); // コンポーネントがマウントされた時のみ実行

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      category: "all",
      description: "",
      emergency: "low",
      status: "pending",
    },
  });
  const onSubmit = async (data: any) => {
    await addPostAction(data);
    form.reset();
  };

  return (
    <FormComp {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="block  sm:flex items-center gap-3">
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

          {/* category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.id}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                      <SelectValue placeholder="emaegency" />
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
        {/* descriptiom */}
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
        <Button type="submit" className="w-full ">
          Add
        </Button>
      </form>
    </FormComp>
  );
};

export default Form;
