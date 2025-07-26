import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class TaskDTO {
    @IsOptional() @IsNumber()
    id?:  number;

    @IsUUID()
    user: string;

    @IsString()
    title: string;

    @IsOptional() @IsString() 
    description?: string;

    @IsOptional() @IsString() 
    createdAt?: string;

    @IsOptional() @IsString()  @IsIn(["Low" , "Medium" , "High"])
    priority?: string;

    @IsBoolean()
    completed: boolean;  
}