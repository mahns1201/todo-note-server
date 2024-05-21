import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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

  @Get('github/url')
  githubLoginUrl() {
    return this.authService.githubLoginUrl();
  }
}
