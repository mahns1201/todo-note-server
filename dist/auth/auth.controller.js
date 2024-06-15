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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./guard/jwt-auth.guard");
const local_auth_guard_1 = require("./guard/local-auth.guard");
const auth_service_1 = require("./auth.service");
const get_github_token_dto_1 = require("./dto/get-github-token.dto");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const payload_dto_1 = require("./dto/payload.dto");
const get_github_login_url_dto_1 = require("./dto/get-github-login-url.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '로그인을 성공했습니다.',
            item: { accessToken: req.user.accessToken },
        };
    }
    getProfile(req) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'jwt payload를 조회했습니다.',
            item: req.user,
        };
    }
    getGithubLoginUrl() {
        const url = this.authService.githubLoginUrl();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '깃허브 로그인 URL을 조회했습니다.',
            item: url,
        };
    }
    async getGithubTokenByCode(query) {
        const user = await this.authService.getGithubTokenByCode(query.code);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '깃허브 로그인을 성공했습니다.',
            item: { accessToken: user.accessToken },
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: '로그인',
        description: '비밀번호를 사용하여 로그인합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: login_dto_1.ResLoginDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('payload'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiOperation)({
        summary: 'payload 조회',
        description: 'access token의 payload를 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: payload_dto_1.ResPayloadDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", payload_dto_1.ResPayloadDto)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('github/url'),
    (0, swagger_1.ApiOperation)({
        summary: '깃허브 로그인 URL 조회',
        description: '깃허브 로그인 URL을 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: get_github_login_url_dto_1.ResGetGithubLoginUrlDto,
        status: common_1.HttpStatus.OK,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", get_github_login_url_dto_1.ResGetGithubLoginUrlDto)
], AuthController.prototype, "getGithubLoginUrl", null);
__decorate([
    (0, common_1.Get)('github/callback'),
    (0, swagger_1.ApiOperation)({
        summary: '깃허브 콜백 요청',
        description: '깃허브 code로 로그인 콜백 요청 합니다.',
    }),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'code',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: get_github_token_dto_1.ResGetGithubTokenDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_github_token_dto_1.GetGithubTokenByCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getGithubTokenByCode", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map