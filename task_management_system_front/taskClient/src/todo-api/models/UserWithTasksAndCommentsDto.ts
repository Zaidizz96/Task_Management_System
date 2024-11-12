import { TaskDto } from "./task-dto";

export interface UserWithTasksAndCommentsDto {
    
  id: number;
  name: string;
  email: string;
  active: boolean;
  tasks: TaskDto[];
}