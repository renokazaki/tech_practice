"use client";

import { z } from "zod";

const Emergency = z.enum(["low", "middle", "high"]);

const Status = z.enum(["pending", "in progress", "done"]);

const FormSchema = z.object({
  title: z.string().max(25),
  description: z.string().max(100).optional(),
  emergency: Emergency,
  status: Status,
});

export default FormSchema;
export type TasksStatus = z.infer<typeof Status>;
export type FormSchema = z.infer<typeof FormSchema>;
