import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OutputFindUserDto } from './dto/find-user.dto';
import { AuthGuard } from 'src/auth/jwt/auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'JWT',
    description: 'Bearer JWT 토큰을 해더에 담아서 요청',
  })
  @ApiOperation({
    summary: '유저 조회',
    description: '유저를 id로 조회한다.',
  })
  async findOne(@Request() request): Promise<OutputFindUserDto> {
    const { id: userId } = request.user;

    const user = await this.userService.findOne(userId);
    const httpStatus = !user ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !user
      ? '유저를 찾을 수 없습니다.'
      : '유저를 성공적으로 찾았습니다.';

    const result = { item: user, httpStatus, message };

    return result;
  }
}

// @Post()
// @HttpCode(HttpStatus.CREATED)
// @ApiOperation({
//   summary: '유저 생성',
//   description: '새로운 유저를 생성합니다.',
// })
// @ApiResponse({
//   type: OutputFindUserDto,
//   status: HttpStatus.CREATED,
//   description: '유저를 성공적으로 생성하였습니다.',
// })
// @ApiResponse({
//   type: OutputFindUserDto,
//   status: HttpStatus.INTERNAL_SERVER_ERROR,
//   description: '유저를  알 수 없는 이유로 생성할 수 없습니다.',
// })
// async create(
//   @Body() input: InputCreateUserDto,
// ): Promise<OutputCreateUserDto> {
//   const { item } = await this.userService.createUser(input);
//   const httpStatus = !item
//     ? HttpStatus.INTERNAL_SERVER_ERROR
//     : HttpStatus.CREATED;
//   const message = !item
//     ? '유저 생성에 실패했습니다.'
//     : '유저가 성공적으로 생성되었습니다.';

//   const result = { item, httpStatus, message };
//   return result;
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
