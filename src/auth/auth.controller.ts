import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import {
  GetGithubTokenByCodeDto,
  ResGetGithubTokenDto,
} from './dto/get-github-token.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResLoginDto } from './dto/login.dto';
import { ResPayloadDto } from './dto/payload.dto';
import { ResGetGithubLoginUrlDto } from './dto/get-github-login-url.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '비밀번호를 사용하여 로그인합니다.',
  })
  @ApiOkResponse({
    type: ResLoginDto,
    status: HttpStatus.OK,
  })
  async login(@Request() req): Promise<ResLoginDto> {
    return {
      statusCode: HttpStatus.OK,
      message: '로그인을 성공했습니다.',
      item: {
        id: req.user.id,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
        email: req.user.email,
        githubId: req.user.githubId,
        avatarUrl: req.user.avatarUrl,
        isGithub: req.user.isGithub,
        accessToken: req.user.accessToken,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('payload')
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'payload 조회',
    description: 'access token의 payload를 조회합니다.',
  })
  @ApiOkResponse({
    type: ResPayloadDto,
    status: HttpStatus.OK,
  })
  getProfile(@Request() req): ResPayloadDto {
    return {
      statusCode: HttpStatus.OK,
      message: 'jwt payload를 조회했습니다.',
      item: req.user,
    };
  }

  @Get('github/url')
  @ApiOperation({
    summary: '깃허브 로그인 URL 조회',
    description: '깃허브 로그인 URL을 조회합니다.',
  })
  @ApiOkResponse({
    type: ResGetGithubLoginUrlDto,
    status: HttpStatus.OK,
  })
  getGithubLoginUrl(): ResGetGithubLoginUrlDto {
    const url = this.authService.githubLoginUrl();

    return {
      statusCode: HttpStatus.OK,
      message: '깃허브 로그인 URL을 조회했습니다.',
      item: url,
    };
  }

  @Get('github/callback')
  @ApiOperation({
    summary: '깃허브 콜백 요청',
    description: '깃허브 code로 로그인 콜백 요청 합니다.',
  })
  @ApiQuery({
    type: String,
    name: 'code',
  })
  @ApiOkResponse({
    type: ResGetGithubTokenDto,
    status: HttpStatus.OK,
  })
  async getGithubTokenByCode(
    @Query() query: GetGithubTokenByCodeDto,
  ): Promise<ResGetGithubTokenDto> {
    const user = await this.authService.getGithubTokenByCode(query.code);

    return {
      statusCode: HttpStatus.OK,
      message: '깃허브 로그인을 성공했습니다.',
      item: {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        githubId: user.githubId,
        avatarUrl: user.avatarUrl,
        isGithub: user.isGithub,
        accessToken: user.accessToken,
      },
    };
  }

  // @Get('github')
  // @UseGuards(GithubOauthGuard)
  // async githubAuth() {
  //   // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
  //   // automatically provisioned for us when we extended the passport-github strategy.
  //   // The Guard initiates the passport-github flow.
  // }

  // @Get('github/callback')
  // @UseGuards(GithubOauthGuard)
  // async githubAuthCallback(@Req() req) {
  //   return req.user;
  // }
}
