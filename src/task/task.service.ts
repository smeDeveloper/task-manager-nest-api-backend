import { Injectable, ParseUUIDPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./task.entity";
import { Repository } from "typeorm";
import { TaskDTO } from "src/DTOs/task.dto";
import { UpdateTaskDTO } from "src/DTOs/updateTask.dto";
import { RemoveTaskDTO } from "src/DTOs/removetask.dto";

@Injectable()

export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private tasksRepo: Repository<TaskEntity>
    ) { }

    async getUserTasks(userID: string): Promise<TaskDTO[]> {
        const tasks = await this.tasksRepo.find({
            where: { user: { id: userID }, },
            relations: ["user"],
        })
        return tasks.map(task => ({
            ...task,
            user: task.user.id
        }));
    }

    async addNewTask(data: TaskDTO): Promise<object> {
        await this.tasksRepo.save({ ...data, user: { id: data.user, }, });
        return { msg: "Task has been saved in the database.", };
    }

    async updateTask(data: UpdateTaskDTO): Promise<object> {
        if (data.id) {
            const task = await this.tasksRepo.findOne({ where: { id: data.id, }, relations: ["user"], });
            if (task) {
                if (task.user.id === data.user) {
                    const newTask = { ...task, ...data , user: task.user, };
                    await this.tasksRepo.update({ id: data.id, }, newTask);
                    return { msg: "Task has been updated successfully!", data: newTask, };
                }else return {msg: "Only the task creator can update this task.",};
            } else return { msg: "Something went wrong, we couldn't find a task with the ID " + data.id + " in the database", };
        }
        return { msg: "There is no ID provided for a task to update", };
    }

    async deleteTask(data:RemoveTaskDTO):Promise<object> {
        const foundTask = await this.tasksRepo.findOne({where: {id: data.id,}, relations: ["user"],});
        if(!foundTask) return {msg: "Something went wrong, we couldn't find a task with the ID " + data.id + " in the database",}
        if(foundTask.user.id !== data.user) return {msg: "Only the task creator can remove this task.",}
        await this.tasksRepo.delete({id: data.id,});
        return {msg: "Task has been removed successfully!", data: foundTask,};
    }
}