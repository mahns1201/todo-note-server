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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubOauthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_service_1 = require("../jwt/jwt-auth.service");
const github_oauth_guard_1 = require("./github-oauth.guard");
let GithubOauthController = class GithubOauthController {
    constructor(jwtAuthService) {
        this.jwtAuthService = jwtAuthService;
    }
    async githubAuth() {
    }
    async githubAuthCallback(req, res) {
        const user = req.user;
        console.log(`${this.githubAuthCallback.name}(): req.user = ${JSON.stringify(user, null, 4)}`);
        const { accessToken } = this.jwtAuthService.login(user);
        res.cookie('jwt', accessToken);
        return { access_token: accessToken };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(github_oauth_guard_1.GithubOauthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GithubOauthController.prototype, "githubAuth", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)(github_oauth_guard_1.GithubOauthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubOauthController.prototype, "githubAuthCallback", null);
GithubOauthController = __decorate([
    (0, common_1.Controller)('auth/github'),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_auth_service_1.JwtAuthService !== "undefined" && jwt_auth_service_1.JwtAuthService) === "function" ? _a : Object])
], GithubOauthController);
exports.GithubOauthController = GithubOauthController;
//# sourceMappingURL=github-oauth.controller.js.map