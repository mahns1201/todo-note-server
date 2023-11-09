"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputGithubCallbackDto = void 0;
const common_dto_1 = require("../../../common/common.dto");
const swagger_1 = require("@nestjs/swagger");
const github_oauth_dto_1 = require("./github-oauth.dto");
class githubCallbackDto extends (0, swagger_1.PickType)(github_oauth_dto_1.GithubOauthDto, [
    'user',
    'accessToken',
]) {
}
class OutputGithubCallbackDto extends common_dto_1.SwaggerResponseDto {
}
exports.OutputGithubCallbackDto = OutputGithubCallbackDto;
//# sourceMappingURL=github-callback.dto.js.map