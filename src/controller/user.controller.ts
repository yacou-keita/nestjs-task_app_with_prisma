import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { AuthUser } from 'src/core/user.decorator';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/dtos/create_user.dto';
import { LoginDTO } from 'src/dtos/login.dto';




@Controller("/user")
export class UserController {

  constructor(private readonly userService: UserService) { }

  // @Get("/all")
  // getUser(@AuthUser() user: any) {
  //   console.log("test decorator", user)
  //   return this.userService.getAllUsers()
  // }

 
  @Get("/me")
  getUserConnected(@AuthUser() user: any) {
    return this.userService.getUserById(user.id)
  }

  // @Get("/:id")
  // getUserById(@Param("id", ParseIntPipe) id: number) {
  //   return this.userService.getUserById(id)
  // }

  // @Get("/search")
  // getUserByName(@Query("name") name: string) {
  //   return this.userService.getUserByName(name)
  // }

  
  @Post("/create")
  createUser(@Body() request: CreateUserDTO): Promise<User> {
    return this.userService.createUser(request);
  }

  
  @Post("/login")
  login(@Body() request: LoginDTO) {
    return this.userService.login(request);
  }

}
