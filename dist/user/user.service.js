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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const octokit_1 = require("octokit");
const request_url_1 = require("../common/request-url");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(input) {
        const { email, githubId, password, avatarUrl, isGithub, githubAccessToken, } = input;
        const newUser = this.userRepository.create({
            email,
            githubId,
            password,
            avatarUrl,
            isGithub,
            githubAccessToken,
        });
        const savedUser = await this.userRepository.save(newUser);
        common_1.Logger.log(`유저: ${email} 회원가입 완료`);
        return { item: savedUser };
    }
    async findOne(input) {
        const { id } = input;
        const user = await this.userRepository.findOne({
            where: {
                id,
                deletedAt: null,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(`id: ${id} 유저를 찾을 수 없습니다.`);
        }
        return { item: user };
    }
    async getGithubAccessToken(input) {
        const { id } = input;
        const { item: user } = await this.findOne({ id });
        return { item: user === null || user === void 0 ? void 0 : user.githubAccessToken };
    }
    async findUser(input) {
        const { email } = input;
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        return { item: user };
    }
    async updateGithubAccessToken(input) {
        const { email, githubAccessToken } = input;
        const user = await this.userRepository.update({ email }, { githubAccessToken });
        return { item: user };
    }
    async getGithubProfile(githubAccessToken) {
        const octokit = new octokit_1.Octokit({
            auth: githubAccessToken,
        });
        const { data: result } = await octokit.request('GET /user', {
            headers: {
                'X-GitHub-Api-Version': request_url_1.REQUEST_INFO.GITHUB.API_VERSION,
            },
        });
        return result;
    }
    async getGithubEmail(githubAccessToken) {
        const octokit = new octokit_1.Octokit({
            auth: githubAccessToken,
        });
        const { data } = await octokit.request('GET /user/emails', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        const result = data
            .filter((item) => item.primary)
            .map((item) => item.email)[0];
        return result;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map