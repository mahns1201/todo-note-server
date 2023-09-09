import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputCreateUserDto, OutputCreateUserDto } from './dto/create-user.dto';
import { InputFindUserDto, OutputFindUserDto } from './dto/find-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() input: InputCreateUserDto,
  ): Promise<OutputCreateUserDto> {
    const { item } = await this.userService.createUser(input);
    const httpStatus = !item ? HttpStatus.BAD_REQUEST : HttpStatus.CREATED;
    const message = `성공적으로 유저가 생성되었습니다.`;

    const result = { item, httpStatus, message };
    return result;
  }

  @Get('/:email')
  async findOne(@Param() input: InputFindUserDto): Promise<OutputFindUserDto> {
    const { item } = await this.userService.findUser(input);
    const httpStatus = !item ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !item
      ? '해당 이메일로 찾은 유저가 없습니다.'
      : '유저를 찾았습니다.';

    const result = { item, httpStatus, message };
    return result;
  }

  // @Get()
  // async findAll(): Promise<UserEntity[]> {
  //   return this.userService.findAll();
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() user: UserEntity,
  // ): Promise<number> {
  //   return this.userService.update(+id, user);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<number> {
  //   return this.userService.remove(+id);
  // }
}
