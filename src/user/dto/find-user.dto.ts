import { BaseResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

class OutputUserDto extends OmitType(UserDto, [
  'password',
  'githubAccessToken',
] as const) {}

export class InputFindUserDto extends PickType(UserDto, ['id'] as const) {}
export class OutputFindUserDto extends BaseResponseDto {
  @ApiProperty()
  item: OutputUserDto;
}
