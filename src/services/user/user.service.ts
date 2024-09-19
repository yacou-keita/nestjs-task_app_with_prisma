import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDTO } from 'src/dtos/create_user.dto';
import { LoginDTO } from 'src/dtos/login.dto';
import { UserModel } from 'src/model/user.model';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {

    constructor(private readonly prismaService: PrismaService) { }

    async getAllUsers() {
        return await this.prismaService.user.findMany({ include: { Task: true } })
    }

    async createUser(data: CreateUserDTO) {
        data.password = await hash(data.password, 10)
        return await this.prismaService.user.create({ data })
    }

    async login({ email, password }: LoginDTO): Promise<{ accessToken: string }> {
        const userFound = await this.prismaService.user.findUnique({ where: { email } })
        const verifyPassword = await compare(password, userFound.password)
        if (verifyPassword) return { accessToken: this.generateToken({ data: { userId: userFound.id }, key: process.env.SECRET_tOKEN }) }
        throw new UnauthorizedException("mot de passe ou email incorrect")
    }

    async getUserById(id: number) {
        const user = await this.prismaService.user.findUnique({ where: { id } })
        if (user) return UserModel.fromUser(user)
        throw new NotFoundException("User not found")
    }

    async getUserByName(name: string) {
        return await this.prismaService.user.findMany({
            where: {
                name
            }
        })
    }

    private generateToken({ data, key }: { data: string | object, key: string }) {
        return sign(data, key, {
            expiresIn: "2h"
        });
    }
    private isEmpty(data): boolean {
        return !data
    }


}
