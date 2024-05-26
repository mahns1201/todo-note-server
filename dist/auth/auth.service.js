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
exports.AuthService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const github_service_1 = require("../github/github.service");
let AuthService = class AuthService {
    constructor(configService, userService, githubService, jwtService) {
        this.configService = configService;
        this.userService = userService;
        this.githubService = githubService;
        this.jwtService = jwtService;
    }
    async validateUserByPassword(email, password) {
        const user = await this.userService.findUserByEmail({ email });
        if (!user) {
            throw new common_1.NotFoundException(`${email} 유저를 찾을 수 없습니다.`);
        }
        if (user.password != password) {
            throw new common_1.UnauthorizedException(`${email} 비밀번호가 유효하지 않습니다.`);
        }
        return {
            id: user.id,
            createdAt: user.createdAt,
            email: user.email,
            githubId: user.githubId,
            avatarUrl: user.avatarUrl,
            isGithub: user.isGithub,
            githubToken: user.githubToken,
        };
    }
    async signIn(user) {
        const payload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }
    githubLoginUrl() {
        const client_id = this.configService.get('GITHUB_CLIENT_ID');
        return `https://github.com/login/oauth/authorize?response_type=code&scope=user%2Crepo%2Cproject&client_id=${client_id}`;
    }
    async getGithubTokenByCode(code) {
        const clientId = this.configService.get('GITHUB_CLIENT_ID');
        const clientSecret = this.configService.get('GITHUB_CLIENT_SECRET');
        const res = await axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: clientId,
            client_secret: clientSecret,
            code,
        }, { headers: { accept: 'application/json' } });
        return await this.githubStrategyLogic(res.data.access_token);
    }
    async githubStrategyLogic(githubToken) {
        const email = await this.githubService.getEmail(githubToken);
        const profile = await this.githubService.getProfile(githubToken);
        const { login: githubId, avatar_url: avatarUrl } = profile;
        let user = await this.userService.findUserByEmail({ email });
        if (user) {
            this.userService.updateUser({ id: user.id }, {
                githubId,
                avatarUrl,
                isGithub: true,
                githubToken,
            });
        }
        else {
            user = await this.userService.createUser({
                email,
                password: null,
                githubId,
                avatarUrl,
                isGithub: true,
                githubToken,
            });
        }
        const accessToken = await this.signIn(user);
        return Object.assign(Object.assign({}, user), { githubToken, accessToken });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        github_service_1.GithubService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map