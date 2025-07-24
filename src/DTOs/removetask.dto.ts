import { IsNumber, IsUUID } from "class-validator";

export class RemoveTaskDTO {
    @IsNumber()
    id: number;

    @IsUUID()
    user: string;
}