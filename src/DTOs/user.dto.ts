import { IsEmail, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class UserDTO {
    @IsOptional() @IsUUID()
    id?: string;

    @IsString() @Length(5 , 50)
    name: string;

    @IsEmail()
    email: string;

    @Length(8 , 100)
    password: string;
}