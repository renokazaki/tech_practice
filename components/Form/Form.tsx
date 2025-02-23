/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Form as FormComp,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

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
import { CardTitle } from "@/components/ui/card";
import { usePostTask } from "./hooks/usePostTask";
import { useFirstGetCategory } from "../navbar/hooks/useFirstGetCategory";

const Form = ({
  setIsAddTask,
  selectCategory,
  setSelectCategory,
}: {
  setIsAddTask: Dispatch<SetStateAction<boolean>>;
  selectCategory: Category;
  setSelectCategory: Dispatch<SetStateAction<Category>>;
}) => {
  const { onSubmit, form, isSubmitting } = usePostTask({
    selectCategory,
    setIsAddTask,
  });

  useFirstGetCategory({ selectCategory, setSelectCategory });

  //==============================================================

  return (
    <>
      <div className="pb-16 hidden lg:block">
        <CardTitle>Task Management</CardTitle>
      </div>
      <FormComp {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Emergency */}
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
            {/* Status */}
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
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Textarea
                    className="text-xs resize-none"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "送信中" : "追加"}
          </Button>
        </form>
      </FormComp>
    </>
  );
};

export default Form;
