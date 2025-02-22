export interface Task {
  id: string;
  title: string;
  emergency: Emergency;
  status: Status;
  description: string;
}

export type Emergency = "low" | "middle" | "high";

export type Status = "pending" | "in progress" | "done";
