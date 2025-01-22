export interface Task {
    id:string;
    title: string;
    emergency: "low" | "middle" | "high";
    status: "pending" | "in progress" | "done";
    description: string;
  }