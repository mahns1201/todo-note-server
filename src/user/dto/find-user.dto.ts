import { UserDto } from './user.dto';
import { PickType } from '@nestjs/swagger';

export class FindUserByIdDto extends PickType(UserDto, ['id'] as const) {}

export class ResUserDto extends PickType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
  'email',
  'githubId',
  'avatarUrl',
  'isGithub',
] as const) {}
