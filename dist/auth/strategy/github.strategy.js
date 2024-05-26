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
exports.GithubStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_github_1 = require("passport-github");
const github_service_1 = require("../../github/github.service");
const user_dao_1 = require("../../user/user.dao");
const auth_service_1 = require("../auth.service");
let GithubStrategy = class GithubStrategy extends (0, passport_1.PassportStrategy)(passport_github_1.Strategy, 'github') {
    constructor(configService, authService, userDao, githubService) {
        super({
            clientID: configService.get('GITHUB_CLIENT_ID'),
            clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
            callbackURL: configService.get('GITHUB_CALLBACK_URL'),
            scope: ['user', 'repo'],
        });
        this.configService = configService;
        this.authService = authService;
        this.userDao = userDao;
        this.githubService = githubService;
    }
    async validate(githubToken, _refreshToken, profile, done) {
        const { login: githubId, email, avatar_url: avatarUrl } = profile._json;
        let user = await this.userDao.findByEmail(email);
        if (user) {
            this.userDao.update(user.id, {
                githubId,
                avatarUrl,
                isGithub: true,
                githubToken,
            });
        }
        else {
            const profile = await this.githubService.getProfile(githubToken);
            const { login: githubId, avatar_url: avatarUrl } = profile;
            user = await this.userDao.create({
                email,
                password: null,
                githubId,
                avatarUrl,
                isGithub: true,
                githubToken,
            });
        }
        const accessToken = await this.authService.signIn(user);
        done(null, Object.assign(Object.assign({}, user), { githubToken, accessToken }));
    }
};
exports.GithubStrategy = GithubStrategy;
exports.GithubStrategy = GithubStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService,
        user_dao_1.UserDao,
        github_service_1.GithubService])
], GithubStrategy);
//# sourceMappingURL=github.strategy.js.map