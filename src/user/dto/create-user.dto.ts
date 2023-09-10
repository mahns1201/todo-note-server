import { SwaggerResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';

export class InputCreateUserDto extends UserDto {}
export class OutputCreateUserDto extends SwaggerResponseDto<UserDto> {}
