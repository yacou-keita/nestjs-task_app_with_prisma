import { IsNotEmpty } from "class-validator"

export class CreateTaskDTO {
    
    @IsNotEmpty({ message: "le title est obligatoire" })
    title: string

    @IsNotEmpty({ message: "le description est obligatoire" })
    description: string
}