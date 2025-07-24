import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { TaskDTO } from "src/DTOs/task.dto";
import { TaskService } from "./task.service";
import { UpdateTaskDTO } from "src/DTOs/updateTask.dto";
import { RemoveTaskDTO } from "src/DTOs/removetask.dto";

@Controller("api/tasks")
export class TasksController {
    constructor (private readonly tasksService:TaskService) {}
    @Get(":id")
    getUserTasks(@Param("id" , ParseUUIDPipe) id: string,): Promise<TaskDTO[]> {
        return this.tasksService.getUserTasks(id)
    }

    @Post("add-new-task")
    addNewTask(@Body() data:TaskDTO ): Promise<object> {
        return this.tasksService.addNewTask(data);
    }

    @Patch("update-task")
    updateTask(@Body() data:UpdateTaskDTO):Promise<object> {
        return this.tasksService.updateTask(data);
    }

    @Delete("delete-task")
    deleteTask(@Body() data:RemoveTaskDTO):Promise<object> {
        return this.tasksService.deleteTask(data);
    }
}