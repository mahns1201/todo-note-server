import { SwaggerResponseDto } from 'src/common/common.dto';
import { PickType } from '@nestjs/swagger';
import { GithubOauthDto } from './github-oauth.dto';

class githubCallbackDto extends PickType(GithubOauthDto, [
  'user',
  'accessToken',
] as const) {}
export class OutputGithubCallbackDto extends SwaggerResponseDto<githubCallbackDto> {}
