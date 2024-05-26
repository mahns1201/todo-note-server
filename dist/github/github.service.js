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
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const octokit_1 = require("octokit");
let GithubService = class GithubService {
    constructor() {
        this.octokit = this.createOctokitInstance();
    }
    createOctokitInstance() {
        return new octokit_1.Octokit({});
    }
    async callGitHubApi(url, githubToken, params) {
        try {
            const { data } = await this.octokit.request(url, Object.assign(Object.assign({}, params), { headers: {
                    authorization: `token ${githubToken}`,
                    'X-GitHub-Api-Version': '2022-11-28',
                } }));
            return data;
        }
        catch (error) {
            common_1.Logger.error(error.message, error.stack, 'GithubService.callGitHubApi');
            throw error;
        }
    }
    async getProfile(githubToken) {
        return await this.callGitHubApi('GET /user', githubToken);
    }
    async getEmail(githubToken) {
        const { data } = await this.octokit.request('GET /user/emails', {
            headers: { authorization: `token ${githubToken}` },
        });
        return data.filter((item) => item.primary).map((item) => item.email)[0];
    }
    async getRepos(githubToken) {
        return await this.callGitHubApi('GET /user/repos', githubToken);
    }
    async getBranches(githubToken, owner, repo) {
        const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/branches', {
            owner,
            repo,
            headers: { authorization: `token ${githubToken}` },
        });
        return data;
    }
};
exports.GithubService = GithubService;
exports.GithubService = GithubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GithubService);
//# sourceMappingURL=github.service.js.map