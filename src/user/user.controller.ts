import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OutputFindUserDto } from './dto/find-user.dto';
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { ErrorResponseDto } from 'src/common/common.dto';
import { User } from 'src/decorator/user.decorator';
import { jwtUserT } from 'src/constant/jwt.constant';

@Controller('user')
@ApiBearerAuth('accessToken')
@ApiTags('USER')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'JWT 토큰으로 유저를 조회한다.' })
  @ApiOkResponse({
    type: OutputFindUserDto,
    status: HttpStatus.OK,
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    status: HttpStatus.NOT_FOUND,
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    status: HttpStatus.NOT_FOUND,
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async findOne(@User() jUser: jwtUserT): Promise<OutputFindUserDto> {
    const { id } = jUser;

    const { item: user } = await this.userService.findOne({ id });
    // eslint-disable-next-line
    const { password, githubAccessToken, ...outputUser } = user;

    return {
      httpStatus: HttpStatus.OK,
      message: '유저를 성공적으로 찾았습니다',
      item: outputUser,
    };
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
//   const { item } = await this.userService.create(input);
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
