import { UserDto } from './user.dto';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(UserDto, [
  'email',
  'githubId',
  'password',
  'avatarUrl',
  'isGithub',
  'githubAccessToken',
] as const) {}
