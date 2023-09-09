import { SwaggerResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
import { PickType } from '@nestjs/swagger';

export class InputFindUserDto extends PickType(UserDto, ['email'] as const) {}
export class OutputFindUserDto extends SwaggerResponseDto<UserDto> {}
