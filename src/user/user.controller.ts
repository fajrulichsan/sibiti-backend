// user/user.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number){
    return this.userService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  // @Put(':id')
  // async update(@Param('id') id: number, @Body() user: User): Promise<User> {
  //   return this.userService.update(id, user);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
