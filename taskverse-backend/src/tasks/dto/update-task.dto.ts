import { TaskStatus } from '../schemas/task.schema';

export class UpdateTaskDto {
  readonly title?: string;
  readonly description?: string;
  readonly dueDate?: Date;
  readonly status?: TaskStatus;
}