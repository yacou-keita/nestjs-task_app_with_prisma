import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Status } from "@prisma/client";
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
    async getAllTask(@AuthUser() user: any, @Query("status", new ParseEnumPipe(Status, { optional: true })) status: Status) {
        return await this.taskService.getUserTask({ authorId: user.id, status })
    }

    @Put("/:id/pending")
    async pendingTask(@AuthUser() user: any, @Param("id", new ParseIntPipe()) id: number) {
        return await this.taskService.pendingTask({ authorId: user.id, taskId: id })
    }

    @Put("/:id/starting")
    async startingTask(@AuthUser() user: any, @Param("id", new ParseIntPipe()) id: number) {
        return await this.taskService.startingTask({ authorId: user.id, taskId: id })
    }

    @Put("/:id/finishing")
    async finishingTask(@AuthUser() user: any, @Param("id", new ParseIntPipe()) id: number) {
        return await this.taskService.finishingTask({ authorId: user.id, taskId: id })
    }
}