// types.ts
export type Emergency = "low" | "middle" | "high";
export type Status = "pending" | "in progress" | "done";

export type Task = {
  id: number;
  title: string;
  description: string;
  emergency: Emergency;
  status: Status;
};
