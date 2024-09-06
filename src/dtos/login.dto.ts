import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDTO {

    @IsNotEmpty({ message: "l'adresse amil est obligatoire" })
    @IsEmail({}, { message: "le format de l'adress mail es incorrect" })
    email: string

    @IsNotEmpty({ message: "le mot de passe est obligatoire" })
    password: string
}