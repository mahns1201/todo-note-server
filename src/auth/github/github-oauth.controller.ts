import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { GithubOauthGuard } from './github-oauth.guard';
import { OutputGithubCallbackDto } from './dto/github-callback.dto';
@Controller('auth/github')
export class GithubOauthController {
  // constructor() {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(
    @Req() req: Request,
  ): Promise<OutputGithubCallbackDto> {
    const {
      user: { user, accessToken },
    } = req;

    const item = { user, accessToken };
    const httpStatus = !accessToken
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.OK;
    const message = !accessToken
      ? 'Github 로그인을 알 수 없는 이유로 실패하였습니다.'
      : 'Github 로그인을 성공하였습니다.';

    const result = { item, httpStatus, message };
    return result;
  }
}
