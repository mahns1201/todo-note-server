import { SwaggerResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
import { OmitType } from '@nestjs/swagger';

export class InputCreateUserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
export class OutputCreateUserDto extends SwaggerResponseDto<UserDto> {}
