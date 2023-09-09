import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { InputCreateUserDto, OutputCreateUserDto } from './dto/create-user.dto';
import { SwaggerResponseDto } from 'src/common/common.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(
    @Body() input: InputCreateUserDto,
  ): Promise<OutputCreateUserDto> {
    const { item } = await this.userService.createUser(input);
    console.log('item: ', item);

    const httpStatus = !item ? HttpStatus.BAD_REQUEST : HttpStatus.CREATED;
    const message = `성공적으로 유저가 생성되었습니다.`;

    const result = { item, httpStatus, message };
    return result;
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<UserEntity> {
  //   return this.userService.findOne(+id);
  // }

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
