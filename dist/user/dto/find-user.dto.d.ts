import { SwaggerResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
declare const InputFindUserDto_base: import("@nestjs/common").Type<Pick<UserDto, "email">>;
export declare class InputFindUserDto extends InputFindUserDto_base {
}
export declare class OutputFindUserDto extends SwaggerResponseDto<UserDto> {
}
export {};
