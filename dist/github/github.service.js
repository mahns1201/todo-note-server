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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const octokit_1 = require("octokit");
const request_url_1 = require("../common/request-url");
const user_service_1 = require("../user/user.service");
async function callGitHubApi(endpoint, params, token) {
    try {
        const octokit = new octokit_1.Octokit({ auth: token });
        const { data: result } = await octokit.request(endpoint, Object.assign(Object.assign({}, params), { headers: {
                'X-GitHub-Api-Version': request_url_1.REQUEST_INFO.GITHUB.API_VERSION,
            } }));
        return result;
    }
    catch (error) {
        console.error('error', error);
        throw error;
    }
}
let GithubService = class GithubService {
    constructor(userService) {
        this.userService = userService;
    }
    async findRepos(input) {
        const { githubAccessToken, username } = input;
        const repos = await callGitHubApi(`GET /user/repos`, username, githubAccessToken);
        return { items: repos };
    }
    async findOneRepo(input) {
        const { githubAccessToken, username, repoName } = input;
        const repo = await callGitHubApi(`GET /repos/${username}/${repoName}`, username, githubAccessToken);
        return { item: repo };
    }
    async createRepo(input) {
        const { githubAccessToken, repoName, description } = input, otherFields = __rest(input, ["githubAccessToken", "repoName", "description"]);
        const createdRepo = await callGitHubApi(`Post /user/repos`, Object.assign({ repoName, description }, otherFields), githubAccessToken);
        return { item: createdRepo };
    }
    async updateRepo(input) {
        const { githubAccessToken, username, repoName, updateRepoName, updateDescription } = input, otherFields = __rest(input, ["githubAccessToken", "username", "repoName", "updateRepoName", "updateDescription"]);
        const updatedRepo = await callGitHubApi(`PATCH /repos/${username}/${repoName}`, Object.assign({ name: updateRepoName, description: updateDescription }, otherFields), githubAccessToken);
        return { item: updatedRepo };
    }
    async deleteRepo(input) {
        const { githubAccessToken, username, repoName } = input;
        const deletedRepo = await callGitHubApi(`DELETE /repos/${username}/${repoName}`, {}, githubAccessToken);
        return { item: deletedRepo };
    }
    async findMilestones(input) {
        const { githubAccessToken, username, repoName } = input;
        const milestones = await callGitHubApi(`GET /repos/${username}/${repoName}/milestones`, { owner: username }, githubAccessToken);
        return { items: milestones };
    }
    async findOneMilestone(input) {
        const { githubAccessToken, username, repoName, number } = input;
        const milestone = await callGitHubApi(`GET /repos/${username}/${repoName}/milestones/${number}`, { owner: username }, githubAccessToken);
        return { item: milestone };
    }
    async createMilestone(input) {
        const { githubAccessToken, username, repoName, title, description } = input, otherFields = __rest(input, ["githubAccessToken", "username", "repoName", "title", "description"]);
        const createdMilestone = await callGitHubApi(`Post /repos/${username}/${repoName}/milestones`, Object.assign({ title, description }, otherFields), githubAccessToken);
        return { item: createdMilestone };
    }
    async updateMilestone(input) {
        const { githubAccessToken, username, repoName, updateTitle, updateDescription, number } = input, otherFields = __rest(input, ["githubAccessToken", "username", "repoName", "updateTitle", "updateDescription", "number"]);
        const updatedMilestone = await callGitHubApi(`PATCH /repos/${username}/${repoName}/milestones/${number}`, Object.assign({ title: updateTitle, description: updateDescription }, otherFields), githubAccessToken);
        return { item: updatedMilestone };
    }
    async deleteMilestone(input) {
        const { githubAccessToken, username, repoName, number } = input;
        const deletedMilestone = await callGitHubApi(`DELETE /repos/${username}/${repoName}/milestones/${number}`, {}, githubAccessToken);
        return { item: deletedMilestone };
    }
    async findIssues(input) {
        const { githubAccessToken, username, repoName } = input;
        const issues = await callGitHubApi(`GET /repos/${username}/${repoName}/issues`, { owner: username }, githubAccessToken);
        return { items: issues };
    }
    async findOneIssue(input) {
        const { githubAccessToken, username, repoName, number } = input;
        const issue = await callGitHubApi(`GET /repos/${username}/${repoName}/issues/${number}`, { owner: username }, githubAccessToken);
        return { item: issue };
    }
    async createIssue(input) {
        const { githubAccessToken, username, repoName, title, description } = input, otherFields = __rest(input, ["githubAccessToken", "username", "repoName", "title", "description"]);
        const createdIssue = await callGitHubApi(`Post /repos/${username}/${repoName}/issues`, Object.assign({ title, body: description }, otherFields), githubAccessToken);
        return { item: createdIssue };
    }
    async updateIssue(input) {
        const { githubAccessToken, username, repoName, updateTitle, updateDescription, number } = input, otherFields = __rest(input, ["githubAccessToken", "username", "repoName", "updateTitle", "updateDescription", "number"]);
        const updatedIssue = await callGitHubApi(`PATCH /repos/${username}/${repoName}/issues/${number}`, Object.assign({ title: updateTitle, description: updateDescription }, otherFields), githubAccessToken);
        return { item: updatedIssue };
    }
};
GithubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], GithubService);
exports.GithubService = GithubService;
//# sourceMappingURL=github.service.js.map