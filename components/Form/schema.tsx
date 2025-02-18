"use client";

import { z } from "zod";

const Emergency = z.enum(["low", "middle", "high"]);

const Status = z.enum(["pending", "in progress", "done"]);

const FormSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルを入力してください")
    .max(25, "タイトルは25文字以内で入力してください"),
  description: z
    .string()
    .min(1, "詳細を入力してください")
    .max(100, "説明は100文字以内で入力してください"),
  emergency: Emergency,
  status: Status,
});

export default FormSchema;
export type TasksStatus = z.infer<typeof Status>;
export type FormSchema = z.infer<typeof FormSchema>;
