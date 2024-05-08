import { BaseResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
declare const OutputUserDto_base: import("@nestjs/common").Type<Omit<UserDto, "password" | "githubAccessToken">>;
declare class OutputUserDto extends OutputUserDto_base {
}
declare const InputFindUserDto_base: import("@nestjs/common").Type<Pick<UserDto, "id">>;
export declare class InputFindUserDto extends InputFindUserDto_base {
}
export declare class OutputFindUserDto extends BaseResponseDto {
    item: OutputUserDto;
}
export {};
