import { Module } from "@nestjs/common";
import { TasksController } from "./task.controller";
import { TaskService } from "./task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "./task.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity])],
    controllers: [TasksController],
    providers: [TaskService],
})

export class TaskModule {}