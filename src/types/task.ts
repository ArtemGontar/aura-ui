export interface TaskData {
  id: number;
  name: string;
  bonuses: number;
  link: string;
  type: TaskType;
  status: TaskStatus;
  translations?: {
    [key: string]: {
      name: string;
    };
  };
}

export type TaskType = "external" | "in-app";
export type TaskStatus = "incomplete" | "pending" | "completed";
