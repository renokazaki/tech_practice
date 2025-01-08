"use client";

import React from "react";
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
import { addtask, gettask } from "@/lib/supabasefunction";

// Emergency と Status を型として定義
type Emergency = "low" | "middle" | "high";
type Status = "pending" | "in progress" | "done";

// Task の型定義
type Task = {
  id: number;
  title: string;
  description: string;
  emergency: Emergency;
  status: Status;
};

type FormProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const Form: React.FC<FormProps> = ({ setTasks }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      emergency: "low",
      status: "pending",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // フォームの値を取得
    const formValues = form.getValues();

    // タスクを追加する関数
    await addtask(
      formValues.title,
      formValues.description,
      formValues.emergency,
      formValues.status
    );

    // フォームの値をリセット
    form.reset({
      title: "",
      description: "",
      emergency: "",
      status: "",
    });

    //=====================================================================================================================
    // タスクを取得する関数
    const fetchAllTask = async () => {
      try {
        const alltask = await gettask();
        if (alltask.data) {
          // データをStateに設定
          setTasks(alltask.data);
          console.log("取得したタスク:", alltask.data); // デバッグ用
        } else {
          console.error("タスクの取得に失敗しました:", alltask.error); // エラーをログ出力
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };

    // タスクを追加し、取得する

    await fetchAllTask();
  };

  return (
    <FormComp {...form}>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
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
            render={({}) => (
              <FormItem>
                <FormMessage />
                <Select>
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
            render={({}) => (
              <FormItem className="grow">
                <FormMessage />
                <Select>
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
          <Button type="submit" onClick={handleSubmit}>
            Add task
          </Button>
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
                  placeholder="please input about details"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </FormComp>
  );
};

export default Form;
