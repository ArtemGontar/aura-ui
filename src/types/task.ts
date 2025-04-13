export interface TaskData {
  id: string;
  name: string;
  bonuses: number;
  link: string;
  type: TaskType;
  status: TaskStatus;
}


export type TaskType = "external" | "in-app";
export type TaskStatus = "incomplete" | "pending" | "completed";
