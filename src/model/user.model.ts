import { User } from "@prisma/client";
import { UserResponse } from "src/dtos/user_response.dto";

export class UserModel {

    static fromUser(user: User): UserResponse {
        return { id: user.id, email: user.email, name: user.name }
    }
}