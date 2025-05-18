import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TaskStatus {
  TODO = 'To-Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);