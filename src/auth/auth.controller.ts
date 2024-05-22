import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { GithubOauthGuard } from './guard/github-oauth.guard';

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

  @Get('github')
  @UseGuards(GithubOauthGuard)
  async githubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('github/callback')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(@Req() req) {
    return req.user;
  }
}
