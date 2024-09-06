import { Injectable } from '@nestjs/common';
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
}
