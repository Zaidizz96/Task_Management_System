
export interface UserDto {
    id : number,
    name?: string,
    password?: string,
    email?: string,
    active? : Boolean,
    role?: string
}