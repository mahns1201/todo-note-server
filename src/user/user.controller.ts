import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ResCreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ResFindUserDto } from './dto/find-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth('accessToken')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '유저 생성',
    description: '새로운 유저를 생성합니다.',
  })
  @ApiCreatedResponse({
    type: ResCreateUserDto,
    status: HttpStatus.CREATED,
    description: '유저를 성공적으로 생성하였습니다.',
  })
  async createUser(@Body() body: CreateUserDto): Promise<ResCreateUserDto> {
    const user = await this.userService.createUser(body);
    return {
      statusCode: HttpStatus.CREATED,
      message: '유저를 생성했습니다.',
      item: {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        githubId: user.githubId,
        avatarUrl: user.avatarUrl,
        isGithub: user.isGithub,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({
    type: ResFindUserDto,
    status: HttpStatus.OK,
  })
  async findUser(@Request() req): Promise<ResFindUserDto> {
    const user = await this.userService.findUser({ id: req.user.id });
    return {
      statusCode: HttpStatus.OK,
      message: '유저를 조회했습니다.',
      item: {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        githubId: user.githubId,
        avatarUrl: user.avatarUrl,
        isGithub: user.isGithub,
      },
    };
  }
}
