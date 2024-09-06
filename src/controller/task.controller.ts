import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthUser } from "src/core/user.decorator";
import { CreateTaskDTO } from "src/dtos/create_task.dto";
import { TaskService } from "src/services/task/task.service";

@Controller("/task")
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post("/create")
    async createTask(@Body() task: CreateTaskDTO, @AuthUser() user: any) {
        return await this.taskService.AddTaskToUser(task, user.id)
    }

    @Get("/all")
    async getAllTask(@AuthUser() user: any) {
        return await this.taskService.getUserTask(user.id)
    }
}