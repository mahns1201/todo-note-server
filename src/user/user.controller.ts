import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputCreateUserDto, OutputCreateUserDto } from './dto/create-user.dto';
import { InputFindUserDto, OutputFindUserDto } from './dto/find-user.dto';
import { AuthGuard } from 'src/auth/jwt/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '유저 생성',
    description: '새로운 유저를 생성합니다.',
  })
  @ApiResponse({
    type: OutputFindUserDto,
    status: HttpStatus.CREATED,
    description: '유저를 성공적으로 생성하였습니다.',
  })
  @ApiResponse({
    type: OutputFindUserDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '유저를  알 수 없는 이유로 생성할 수 없습니다.',
  })
  async create(
    @Body() input: InputCreateUserDto,
  ): Promise<OutputCreateUserDto> {
    const { item } = await this.userService.createUser(input);
    const httpStatus = !item
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.CREATED;
    const message = !item
      ? '유저 생성에 실패했습니다.'
      : '유저가 성공적으로 생성되었습니다.';

    const result = { item, httpStatus, message };
    return result;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저 조회',
    description: 'parameter에 email을 넘겨 유저를 조회합니다.',
  })
  @ApiResponse({
    type: OutputFindUserDto,
    status: HttpStatus.OK,
    description: '성공적으로 유저를 찾았을 때 반환합니다.',
  })
  @ApiResponse({
    type: OutputFindUserDto,
    status: HttpStatus.NOT_FOUND,
    description: '이메일로 유저를 찾을 수 없을 때 반환합니다.',
  })
  async findOne(@Request() request): Promise<OutputFindUserDto> {
    const { email } = request.user;

    const { item } = await this.userService.findUser({ email });
    const httpStatus = !item ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !item
      ? '유저를 해당 이메일로 찾을 수 없습니다.'
      : '유저를 성공적으로 찾았습니다.';

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
