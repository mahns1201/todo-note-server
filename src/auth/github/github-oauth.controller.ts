import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GithubOauthService } from './github-oauth.service';
import { GithubOauthGuard } from './github-oauth.guard';
import { OutputGithubCallbackDto } from './dto/github-callback.dto';

@Controller('auth/github')
@ApiTags('oauth - github')
export class GithubOauthController {
  constructor(private githubOauthService: GithubOauthService) {}

  @Get('url')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '깃허브 oauth 로그인 url 요청',
    description: '깃허브 oauth 로그인 url을 리턴한다.',
  })
  githubLoginUrl() {
    const result = this.githubOauthService.githubLoginUrl();

    return result;
  }

  @Get('callback')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'code',
    type: String,
  })
  @ApiOperation({
    summary: '깃허브 oauth 로그인 authorize',
    description:
      '깃허브 oauth 로그인에 대해 지급된 code로 authorize를 수행하고 결과로 jwt 토큰을 발행한다.',
  })
  async getAccessToken(@Query() query) {
    const tokenData = await this.githubOauthService.getGithubAccessToken(
      query.code,
    );

    // token validation check가 실패해도 status 200으로 떨어지고 token.data.error에 값을 담아준다.
    // 따라서 try-catch로 validation check 오류를 잡을 수 없다.
    const { access_token: githubAccessToken, error } = tokenData;

    if (!githubAccessToken || error) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.githubOauthService.githubStrategyLogic(
      githubAccessToken,
    );

    const result = { item: { accessToken } };

    return result;
  }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({
  //   summary: 'Github OAuth',
  //   description:
  //     'Github OAuth 서버로 요청 - callback url이 서버로 되어 있을 때 사용',
  // })
  // @UseGuards(GithubOauthGuard)
  // async githubAuth() {
  //   // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
  //   // automatically provisioned for us when we extended the passport-github strategy.
  //   // The Guard initiates the passport-github flow.
  // }

  // @Get('callback')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({
  //   summary: 'Github OAuth Callback',
  //   description: 'Github OAuth를 서버로 요청 했을 때의 Callback',
  // })
  // @UseGuards(GithubOauthGuard)
  // async githubAuthCallback(@Req() req): Promise<OutputGithubCallbackDto> {
  //   const {
  //     user: { user, accessToken },
  //   } = req;

  //   const item = { user, accessToken };
  //   const httpStatus = !accessToken ? HttpStatus.UNAUTHORIZED : HttpStatus.OK;
  //   const message = !accessToken
  //     ? 'Github 로그인을 알 수 없는 이유로 실패하였습니다.'
  //     : 'Github 로그인을 성공하였습니다.';
  //   const result = { item, httpStatus, message };

  //   return result;
  // }
}
