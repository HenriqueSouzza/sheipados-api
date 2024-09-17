import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { UserDto } from './dto/user-dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<UserDto> {
    return this.userService.findOne(username);
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UpdateUserDto): Promise<void> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}