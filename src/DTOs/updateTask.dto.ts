import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateTaskDTO {
    @IsNumber() @IsNotEmpty()
    id: number;

    @IsNotEmpty() @IsUUID()
    user: string;

    @IsOptional() @IsString()
    title?: string;

    @IsOptional() @IsString() 
    description?: string;

    @IsOptional() @IsNumber() 
    endDate?: string;

    @IsOptional() @IsString()  @IsIn(["Low" , "Medium" , "High"])
    priority?: string;

    @IsOptional() @IsBoolean()
    completed?: boolean;  
}