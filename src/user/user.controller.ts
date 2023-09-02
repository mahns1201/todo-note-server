import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UserEntity,
  ): Promise<number> {
    return this.userService.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.userService.remove(+id);
  }
}
