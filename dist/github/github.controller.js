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
exports.GithubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const github_service_1 = require("./github.service");
const user_service_1 = require("../user/user.service");
const auth_guard_1 = require("../auth/jwt/auth.guard");
const user_decorator_1 = require("../decorator/user.decorator");
let GithubController = class GithubController {
    constructor(githubService, userService) {
        this.githubService = githubService;
        this.userService = userService;
    }
    async findGithubRepos(user) {
        const { id, username } = user;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = { githubAccessToken, username };
        const { items: githubRepositories } = await this.githubService.findRepos(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: '유저의 깃허브 리포지토리 리스트를 성공적으로 조회했습니다',
            items: githubRepositories,
        };
    }
    async findOneRepo(user, param) {
        const { id, username } = user;
        const { repoName } = param;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = { githubAccessToken, username, repoName };
        const { item: githubRepository } = await this.githubService.findOneRepo(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 깃허브 ${repoName} 리포지토리를 성공적으로 조회했습니다`,
            item: githubRepository,
        };
    }
    async createRepo(user, body) {
        const { id, username } = user;
        const { repoName, description } = body, otherFields = __rest(body, ["repoName", "description"]);
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = Object.assign({ githubAccessToken,
            username,
            repoName,
            description }, otherFields);
        const { item: createdRepo } = await this.githubService.createRepo(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 레포지토리를 성공적으로 생성했습니다`,
            items: createdRepo,
        };
    }
    async updateRepo(user, param, body) {
        const { id, username } = user;
        const { repoName } = param;
        const { updateRepoName, updateDescription } = body, otherFields = __rest(body, ["updateRepoName", "updateDescription"]);
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = Object.assign({ githubAccessToken,
            username,
            repoName,
            updateRepoName,
            updateDescription }, otherFields);
        const { item: updatedRepo } = await this.githubService.updateRepo(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${updateRepoName} 레포지토리를 성공적으로 수정했습니다`,
            item: updatedRepo,
        };
    }
    async deleteRepo(user, param) {
        const { id, username } = user;
        const { repoName } = param;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = {
            githubAccessToken,
            username,
            repoName,
        };
        const { item: deletedRepo } = await this.githubService.deleteRepo(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 레포지토리를 성공적으로 삭제했습니다`,
            item: deletedRepo,
        };
    }
    async findAllMilestones(user, param) {
        const { id, username } = user;
        const { repoName } = param;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = { githubAccessToken, username, repoName };
        const { items: githubMilestones } = await this.githubService.findMilestones(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 리포지토리의 Milestone 리스트를 성공적으로 조회했습니다`,
            items: githubMilestones,
        };
    }
    async findOneMilestone(user, param) {
        const { id, username } = user;
        const { repoName, number } = param;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = {
            githubAccessToken,
            username,
            repoName,
            number,
        };
        const { item: githubMilestone } = await this.githubService.findOneMilestone(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} Repo의 ${number}번 Milestone을 성공적으로 조회했습니다`,
            item: githubMilestone,
        };
    }
    async createMilestone(user, param, body) {
        const { id, username } = user;
        const { repoName } = param;
        const { title, description } = body, otherFields = __rest(body, ["title", "description"]);
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = Object.assign({ githubAccessToken,
            username,
            repoName,
            title,
            description }, otherFields);
        const { item: createdMilestone } = await this.githubService.createMilestone(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 레포지토리에 ${title} 마일스톤을 성공적으로 생성했습니다`,
            item: createdMilestone,
        };
    }
    async updateMilestone(user, param, body) {
        const { id, username } = user;
        const { repoName, number } = param;
        const { updateTitle, updateDescription } = body, otherFields = __rest(body, ["updateTitle", "updateDescription"]);
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = Object.assign({ githubAccessToken,
            username,
            repoName,
            updateTitle,
            updateDescription,
            number }, otherFields);
        const { item: updatedMilestone } = await this.githubService.updateMilestone(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 레포지토리의 ${updateTitle} 마일스톤을 성공적으로 수정했습니다`,
            item: updatedMilestone,
        };
    }
    async deleteMilestone(user, param) {
        const { id, username } = user;
        const { repoName, number } = param;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = {
            githubAccessToken,
            username,
            repoName,
            number,
        };
        const { item: deletedMilestone } = await this.githubService.deleteMilestone(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 레포지토리의 ${number} 마일스톤을 성공적으로 삭제했습니다`,
            item: deletedMilestone,
        };
    }
    async findAllIssues(user, param) {
        const { repoName } = param;
        const { id, username } = user;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const item = { githubAccessToken, username, repoName };
        const { items: githubIssues } = await this.githubService.findIssues(item);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 리포지토리의 Issues 리스트를 성공적으로 조회했습니다`,
            items: githubIssues,
        };
    }
    async findOneIssue(user, param) {
        const { id, username } = user;
        const { repoName, number } = param;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = {
            githubAccessToken,
            username,
            repoName,
            number,
        };
        const { item: githubIssue } = await this.githubService.findOneIssue(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 리포지토리의 Issues 리스트를 성공적으로 조회했습니다`,
            item: githubIssue,
        };
    }
    async createIssue(user, param, body) {
        const { id, username } = user;
        const { repoName } = param;
        const { title, description } = body, otherFields = __rest(body, ["title", "description"]);
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = Object.assign({ githubAccessToken,
            username,
            repoName,
            title,
            description }, otherFields);
        const { item: createdIssue } = await this.githubService.createIssue(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 레포지토리에 ${repoName} 이슈를 성공적으로 생성했습니다`,
            items: createdIssue,
        };
    }
    async updateIssues(user, param, body) {
        const { id, username } = user;
        const { repoName, number } = param;
        const { updateTitle, updateDescription } = body, otherFields = __rest(body, ["updateTitle", "updateDescription"]);
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({
            id,
        });
        const input = Object.assign({ githubAccessToken,
            username,
            repoName,
            updateTitle,
            updateDescription,
            number }, otherFields);
        const { item: updatedIssue } = await this.githubService.updateIssue(input);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `유저의 ${repoName} 레포지토리의 ${updateTitle} 이슈를 성공적으로 수정했습니다`,
            item: updatedIssue,
        };
    }
};
__decorate([
    (0, common_1.Get)('repos'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '유저의 깃허브 레포지토리 리스트를 조회한다.' }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "findGithubRepos", null);
__decorate([
    (0, common_1.Get)('repos/:repoName'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: 'repoName',
    }),
    (0, swagger_1.ApiOperation)({ summary: '유저의 깃허브 레포지토리 리스트를 조회한다.' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "findOneRepo", null);
__decorate([
    (0, common_1.Post)('repos'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '유저의 깃허브 레포지토리를 생성한다.' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "createRepo", null);
__decorate([
    (0, common_1.Patch)('repos/:repoName'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: '수정할 repo의 Name',
    }),
    (0, swagger_1.ApiOperation)({ summary: '유저의 깃허브 레포지토리를 수정한다.' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "updateRepo", null);
__decorate([
    (0, common_1.Delete)('repos/:repoName'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: '삭제할 repo의 Name',
    }),
    (0, swagger_1.ApiOperation)({ summary: '유저의 깃허브 레포지토리를 삭제한다.' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "deleteRepo", null);
__decorate([
    (0, common_1.Get)('milestones/:repoName'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: 'repoName',
    }),
    (0, swagger_1.ApiOperation)({
        summary: '유저의 깃허브 특정 리포지토리의 마일스톤 리스트를 조회한다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "findAllMilestones", null);
__decorate([
    (0, common_1.Get)('milestones/:repoName/:number'),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: 'repoName',
    }),
    (0, swagger_1.ApiParam)({
        name: 'number',
        type: String,
        description: 'milestoneNumber',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '유저의 깃허브 특정 리포의 특정 마일스톤을 조회한다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "findOneMilestone", null);
__decorate([
    (0, common_1.Post)('milestones/:repoName'),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        description: 'repoName',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '유저의 깃허브 레포지토리에 마일스톤을 생성한다.' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "createMilestone", null);
__decorate([
    (0, common_1.Patch)('milestones/:repoName/:number'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: '수정할 마일스톤의 레포지토리 이름',
    }),
    (0, swagger_1.ApiParam)({
        name: 'number',
        type: String,
        description: '수정할 마일스톤의 번호',
    }),
    (0, swagger_1.ApiOperation)({
        summary: '유저의 깃허브 특정 레포지토리의 마일스톤을 수정한다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "updateMilestone", null);
__decorate([
    (0, common_1.Delete)('milestones/:repoName/:number'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: '삭제할 마일스톤의 레포지토리 이름',
    }),
    (0, swagger_1.ApiParam)({
        name: 'number',
        type: String,
        description: '삭제할 마일스톤의 번호',
    }),
    (0, swagger_1.ApiOperation)({
        summary: '유저의 깃허브 특정 레포지토리의 마일스톤을 삭제한다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "deleteMilestone", null);
__decorate([
    (0, common_1.Get)('issues/:repoName'),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: 'repoName',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '유저의 깃허브 특정 리포지토리의 이슈 리스트를 조회한다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "findAllIssues", null);
__decorate([
    (0, common_1.Get)('issues/:repoName/:number'),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: 'repoName',
    }),
    (0, swagger_1.ApiParam)({
        name: 'number',
        type: String,
        description: 'issueNumber',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '유저의 깃허브 특정 리포지토리의 특정 이슈를 조회한다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "findOneIssue", null);
__decorate([
    (0, common_1.Post)('issues/:repoName'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: 'repoName',
    }),
    (0, swagger_1.ApiOperation)({ summary: '유저의 깃허브 레포지토리에 이슈를 생성한다.' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "createIssue", null);
__decorate([
    (0, common_1.Patch)('issues/:repoName/:number'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'repoName',
        type: String,
        description: '수정할 이슈의 레포지토리 이름',
    }),
    (0, swagger_1.ApiParam)({
        name: 'number',
        type: String,
        description: '수정할 이슈의 번호',
    }),
    (0, swagger_1.ApiOperation)({
        summary: '유저의 깃허브 특정 레포지토리의 마일스톤을 수정한다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "updateIssues", null);
GithubController = __decorate([
    (0, common_1.Controller)('github'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('GITHUB'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [github_service_1.GithubService,
        user_service_1.UserService])
], GithubController);
exports.GithubController = GithubController;
//# sourceMappingURL=github.controller.js.map