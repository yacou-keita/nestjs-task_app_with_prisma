import { createParamDecorator, ExecutionContext, SetMetadata, UnauthorizedException } from "@nestjs/common";

export const AuthUser = createParamDecorator((data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (request.user) return request.user
    throw new UnauthorizedException("connexion fail")
})