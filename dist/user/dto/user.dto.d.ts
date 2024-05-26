import { BaseDto } from 'src/common/common.dto';
export declare class UserDto extends BaseDto {
    email: string;
    githubId: string;
    password: string;
    avatarUrl: string;
    isGithub: boolean;
    githubToken: string;
}
declare const ResUserDto_base: import("@nestjs/common").Type<Pick<UserDto, "id" | "createdAt" | "updatedAt" | "email" | "githubId" | "avatarUrl" | "isGithub">>;
export declare class ResUserDto extends ResUserDto_base {
}
export declare class ResUserTokenDto extends ResUserDto {
    accessToken: string;
}
export {};
