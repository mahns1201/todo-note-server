import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginByPassword(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('payload')
  getProfile(@Request() req) {
    return req.user;
  }
}
