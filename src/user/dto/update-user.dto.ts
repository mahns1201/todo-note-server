import { SwaggerResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
import { PickType } from '@nestjs/swagger';

export class InputGithubAccessTokenUpdateDto extends PickType(UserDto, [
  'email',
  'githubAccessToken',
] as const) {}

export class OutputGithubAccessTokenUpdateDto extends SwaggerResponseDto<UserDto> {}
