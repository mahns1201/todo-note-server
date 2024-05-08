import { SwaggerResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
declare const InputGithubAccessTokenUpdateDto_base: import("@nestjs/common").Type<Pick<UserDto, "email" | "githubAccessToken">>;
export declare class InputGithubAccessTokenUpdateDto extends InputGithubAccessTokenUpdateDto_base {
}
export declare class OutputGithubAccessTokenUpdateDto extends SwaggerResponseDto<UserDto> {
}
export {};
