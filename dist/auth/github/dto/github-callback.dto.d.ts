import { SwaggerResponseDto } from 'src/common/common.dto';
import { GithubOauthDto } from './github-oauth.dto';
declare const githubCallbackDto_base: import("@nestjs/common").Type<Pick<GithubOauthDto, "user" | "accessToken">>;
declare class githubCallbackDto extends githubCallbackDto_base {
}
export declare class OutputGithubCallbackDto extends SwaggerResponseDto<githubCallbackDto> {
}
export {};
