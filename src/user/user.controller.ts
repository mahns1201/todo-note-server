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
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ResDto } from 'src/common/common.dto';
import { ResUserDto } from './dto/find-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto): Promise<ResDto<ResUserDto>> {
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
  async findUser(@Request() req): Promise<ResDto<ResUserDto>> {
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
