"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubOauthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const github_oauth_service_1 = require("./github-oauth.service");
let GithubOauthController = class GithubOauthController {
    constructor(githubOauthService) {
        this.githubOauthService = githubOauthService;
    }
    githubLoginUrl() {
        const result = this.githubOauthService.githubLoginUrl();
        return result;
    }
    async getAccessToken(query) {
        const tokenData = await this.githubOauthService.getGithubAccessToken(query.code);
        const { access_token: githubAccessToken, error } = tokenData;
        if (!githubAccessToken || error) {
            throw new common_1.UnauthorizedException();
        }
        const accessToken = await this.githubOauthService.githubStrategyLogic(githubAccessToken);
        const result = { item: { accessToken } };
        return result;
    }
};
__decorate([
    (0, common_1.Get)('url'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '깃허브 oauth 로그인 url 요청',
        description: '깃허브 oauth 로그인 url을 리턴한다.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GithubOauthController.prototype, "githubLoginUrl", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiQuery)({
        name: 'code',
        type: String,
    }),
    (0, swagger_1.ApiOperation)({
        summary: '깃허브 oauth 로그인 authorize',
        description: '깃허브 oauth 로그인에 대해 지급된 code로 authorize를 수행하고 결과로 jwt 토큰을 발행한다.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubOauthController.prototype, "getAccessToken", null);
GithubOauthController = __decorate([
    (0, common_1.Controller)('auth/github'),
    (0, swagger_1.ApiTags)('oauth - github'),
    __metadata("design:paramtypes", [github_oauth_service_1.GithubOauthService])
], GithubOauthController);
exports.GithubOauthController = GithubOauthController;
//# sourceMappingURL=github-oauth.controller.js.map