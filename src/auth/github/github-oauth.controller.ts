import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { GithubOauthGuard } from './github-oauth.guard';
import { OutputGithubCallbackDto } from './dto/github-callback.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('auth/github')
@ApiTags('oauth - github')
export class GithubOauthController {
  // constructor() {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Github OAuth',
    description: 'Github OAuth 요청 컨트롤러',
  })
  @UseGuards(GithubOauthGuard)
  async githubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Github OAuth Callback',
    description: 'Github OAuth Callback 컨트롤러',
  })
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
