import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const result = await this.userService.createUser(body);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUser(@Request() req) {
    const result = await this.userService.findUser({ id: req.user.id });
    return result;
  }
}
