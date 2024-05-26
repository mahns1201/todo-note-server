import { ResUserDto, UserDto } from './user.dto';
import { ResDto } from 'src/common/dto/res.dto';
declare const FindUserByIdDto_base: import("@nestjs/common").Type<Pick<UserDto, "id">>;
export declare class FindUserByIdDto extends FindUserByIdDto_base {
}
declare const FindUserByEmailDto_base: import("@nestjs/common").Type<Pick<UserDto, "email">>;
export declare class FindUserByEmailDto extends FindUserByEmailDto_base {
}
export declare class ResFindUserDto extends ResDto {
    item: ResUserDto;
}
export {};
