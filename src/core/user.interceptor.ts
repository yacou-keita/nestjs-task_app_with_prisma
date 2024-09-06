import { CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';
import { decode, verify } from 'jsonwebtoken';


export class UserInterceptor implements NestInterceptor {


    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (token) {
            try {
                verify(token, process.env.SECRET_tOKEN)
            } catch (error) {
                throw new UnauthorizedException(error.message)
            }
            const decodeToken: any = decode(token)
            request.user = { id: decodeToken.userId }
        }
        
        return next.handle()
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}