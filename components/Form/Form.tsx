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
const Form = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      emergency: "low",
      status: "starting",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <Button type="submit">Add task</Button>
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
