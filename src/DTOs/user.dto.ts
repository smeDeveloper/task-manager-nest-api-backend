import { IsEmail, IsString, Length } from "class-validator";

export class UserDTO {
    id?: string;

    @IsString() @Length(5 , 50)
    name: string;

    @IsEmail()
    email: string;

    @Length(8 , 100)
    password: string;
}