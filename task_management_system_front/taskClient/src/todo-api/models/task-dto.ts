import { Status } from "./status_enum";
import { UserDto } from "./user-dto";
import { CommentDto } from "./comment-dto";

export interface TaskDto {
    id? : number | null | undefined,
    title?: string,
    description?: string,
    status? : Status,
    dueDate? : Date,
    userId? : number,
    comments?: CommentDto[];

}