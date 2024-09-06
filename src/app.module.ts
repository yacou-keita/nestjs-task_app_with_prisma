import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { TaskController } from './controller/task.controller';
import { UserController } from './controller/user.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './core/user.interceptor';
;



@Module({
  imports: [
    PrismaModule
  ],
  controllers: [UserController, TaskController],
  providers: [
    UserService,
    TaskService,
    { provide: APP_INTERCEPTOR, useClass: UserInterceptor }
  ],

})
export class AppModule { }
