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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubOauthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../jwt/auth.service");
const user_service_1 = require("../../user/user.service");
const axios_1 = require("axios");
let GithubOauthService = class GithubOauthService {
    constructor(configService, userService, authService) {
        this.configService = configService;
        this.userService = userService;
        this.authService = authService;
    }
    githubLoginUrl() {
        const client_id = this.configService.get('GITHUB_CLIENT_ID');
        return {
            item: `https://github.com/login/oauth/authorize?response_type=code&scope=user%2Crepo%2Cproject&client_id=${client_id}`,
        };
    }
    async getGithubAccessToken(code) {
        const clientId = this.configService.get('GITHUB_CLIENT_ID');
        const clientSecret = this.configService.get('GITHUB_CLIENT_SECRET');
        const body = {
            client_id: clientId,
            client_secret: clientSecret,
            code,
        };
        const opts = {
            headers: { accept: 'application/json' },
        };
        const token = await axios_1.default.post('https://github.com/login/oauth/access_token', body, opts);
        const result = token.data;
        return result;
    }
    async githubStrategyLogic(githubAccessToken) {
        const profile = await this.userService.getGithubProfile(githubAccessToken);
        const email = await this.userService.getGithubEmail(githubAccessToken);
        const { login: githubId, avatar_url } = profile;
        const findUserInput = { email };
        const createUserInput = {
            email,
            githubId,
            password: null,
            avatarUrl: avatar_url,
            isGithub: true,
            githubAccessToken,
        };
        const updateAccessTokenInput = {
            email,
            githubAccessToken,
        };
        const { item: user } = await this.userService.findUser(findUserInput);
        let createdUser;
        if (!user) {
            const { item } = await this.userService.create(createUserInput);
            createdUser = item;
            common_1.Logger.log(`유저: ${email} 깃허브 로그인으로 회원가입 완료`);
        }
        else {
            await this.userService.updateGithubAccessToken(updateAccessTokenInput);
            common_1.Logger.log(`유저: ${email} 깃허브 accessToken 업데이트 완료`);
        }
        if (!user && !createdUser) {
            throw new common_1.UnauthorizedException();
        }
        const { access_token: accessToken } = await this.authService.signIn(email);
        return accessToken;
    }
};
GithubOauthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], GithubOauthService);
exports.GithubOauthService = GithubOauthService;
//# sourceMappingURL=github-oauth.service.js.map