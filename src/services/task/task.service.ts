import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { ChangeTaskStatusDTO } from 'src/dtos/change_task_status.dto';
import { CreateTaskDTO } from 'src/dtos/create_task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {

    constructor(private readonly prismaService: PrismaService) { }

    async AddTaskToUser({ description, title }: CreateTaskDTO, authorId: number) {
        return await this.prismaService.task.create({
            data: {
                description,
                title,
                authorId
            }
        })
    }

    async getUserTask(authorId: number) {
        const taskFound = await this.prismaService.task.findMany({ where: { authorId } })
        if (!taskFound) return []
        return taskFound
    }

    async pendingTask({ authorId, taskId }: ChangeTaskStatusDTO) {
        return await this.changeTaskStatus(taskId, authorId, Status.PENDING);
    }

    async startingTask({ authorId, taskId }: ChangeTaskStatusDTO) {
        return await this.changeTaskStatus(taskId, authorId, Status.STARTING);
    }

    async finishingTask({ authorId, taskId }: ChangeTaskStatusDTO) {
        return await this.changeTaskStatus(taskId, authorId, Status.FINISHED);
    }

    private async changeTaskStatus(id: number, authorId: number, status: Status) {
        const taskUpdated = await this.prismaService.task.update({ where: { id, authorId }, data: { status: status } });
        return taskUpdated;
    }
}
