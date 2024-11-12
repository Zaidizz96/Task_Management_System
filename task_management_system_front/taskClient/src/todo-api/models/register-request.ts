import { Role } from "./role_enum";

export interface RegisterRequest {
    id?: number,
    name: string,
    email : string,
    password : string,
    role : Role,
    status? : Boolean
}