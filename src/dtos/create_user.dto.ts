import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDTO {
    @IsNotEmpty({ message: "le nom est obligatoire" })
    name: string

    @IsNotEmpty({ message: "l'adresse amil est obligatoire" })
    @IsEmail({}, { message: "le format de l'adress mail es incorrect" })
    email: string

    @IsNotEmpty({ message: "le mot de passe est obligatoire" })
    password: string
}