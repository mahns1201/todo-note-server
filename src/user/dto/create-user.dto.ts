import { ResDto } from 'src/common/dto/res.dto';
import { ResUserDto, UserDto } from './user.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(UserDto, [
  'email',
  'githubId',
  'password',
  'avatarUrl',
  'isGithub',
  'githubToken',
] as const) {}

export class ResCreateUserDto extends ResDto {
  @ApiProperty({ description: '생성된 유저' })
  item: ResUserDto;
}
