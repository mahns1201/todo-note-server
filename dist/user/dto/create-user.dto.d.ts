import { ResDto } from 'src/common/dto/res.dto';
import { ResUserDto, UserDto } from './user.dto';
declare const CreateUserDto_base: import("@nestjs/common").Type<Pick<UserDto, "githubToken" | "email" | "githubId" | "password" | "avatarUrl" | "isGithub">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export declare class ResCreateUserDto extends ResDto {
    item: ResUserDto;
}
export {};
