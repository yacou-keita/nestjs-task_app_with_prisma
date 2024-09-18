import { IsNotEmpty, IsNumber } from "class-validator"

export class ChangeTaskStatusDTO {
    @IsNotEmpty()
    @IsNumber()
    taskId: number

    @IsNumber()
    authorId: number
}