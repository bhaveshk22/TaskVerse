export enum TaskStatus {
  TODO = 'To-Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
}