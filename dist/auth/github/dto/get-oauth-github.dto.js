"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGetGithubTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const oauth_github_dto_1 = require("./oauth-github.dto");
class InputGetGithubTokenDto extends (0, swagger_1.PickType)(oauth_github_dto_1.GithubTokenDto, [
    'code',
]) {
}
exports.InputGetGithubTokenDto = InputGetGithubTokenDto;
//# sourceMappingURL=get-oauth-github.dto.js.map