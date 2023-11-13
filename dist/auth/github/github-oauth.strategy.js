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
exports.GithubOauthStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_github_1 = require("passport-github");
const user_service_1 = require("../../user/user.service");
const auth_service_1 = require("../jwt/auth.service");
let GithubOauthStrategy = class GithubOauthStrategy extends (0, passport_1.PassportStrategy)(passport_github_1.Strategy, 'github') {
    constructor(configService, userService, authService) {
        super({
            clientID: configService.get('GITHUB_CLIENT_ID'),
            clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
            callbackURL: configService.get('GITHUB_CALLBACK_URL'),
            scope: ['user', 'repo'],
        });
        this.configService = configService;
        this.userService = userService;
        this.authService = authService;
    }
    async validate(githubAccessToken, _refreshToken, profile) {
        const { login: githubId, email, avatar_url } = profile._json;
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
            const { item } = await this.userService.createUser(createUserInput);
            createdUser = item;
        }
        else {
            await this.userService.updateGithubAccessToken(updateAccessTokenInput);
            common_1.Logger.log(`${user.email} Github accessToken 업데이트`);
        }
        if (!user && !createdUser) {
            throw new common_1.UnauthorizedException();
        }
        const { access_token: accessToken } = await this.authService.signIn(email);
        return { user, accessToken } || { createdUser, accessToken };
    }
};
GithubOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], GithubOauthStrategy);
exports.GithubOauthStrategy = GithubOauthStrategy;
//# sourceMappingURL=github-oauth.strategy.js.map