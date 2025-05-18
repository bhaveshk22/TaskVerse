import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly dueDate: Date;
  readonly status: TaskStatus;
}