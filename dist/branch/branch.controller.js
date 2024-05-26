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
exports.BranchController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const branch_service_1 = require("./branch.service");
const create_branch_dto_1 = require("./dto/create-branch.dto");
const swagger_1 = require("@nestjs/swagger");
const find_branch_dto_1 = require("./dto/find-branch.dto");
const sync_branch_dto_1 = require("./dto/sync-branch.dto");
let BranchController = class BranchController {
    constructor(branchService) {
        this.branchService = branchService;
    }
    async createBranch(req, body) {
        const branch = await this.branchService.createBranch(Object.assign(Object.assign({}, body), { userId: req.user.id }));
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: '브랜치를 생성했습니다.',
            item: {
                id: branch.id,
                userId: branch.userId,
                createdAt: branch.createdAt,
                updatedAt: branch.updatedAt,
                branchName: branch.branchName,
            },
        };
    }
    async findUserRepo(req, param) {
        const branch = await this.branchService.findBranch(Object.assign(Object.assign({}, param), { userId: req.user.id }));
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '브랜치를 조회했습니다..',
            item: {
                id: branch.id,
                userId: branch.userId,
                createdAt: branch.createdAt,
                updatedAt: branch.updatedAt,
                branchName: branch.branchName,
            },
        };
    }
    async syncRepoBranches(req, param) {
        const { syncBranchNames, syncCount } = await this.branchService.syncRepoBranches({
            userId: req.user.id,
            repoId: param.repoId,
        });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: `${syncCount}개 브랜치가 동기화됐습니다.`,
            items: syncBranchNames,
        };
    }
};
exports.BranchController = BranchController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '브랜치 생성',
        description: '새로운 브랜치를 생성합니다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: create_branch_dto_1.ResCreateBranchDto,
        status: common_1.HttpStatus.CREATED,
        description: '브랜치를 성공적으로 생성하였습니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_branch_dto_1.CreateBranchDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "createBranch", null);
__decorate([
    (0, common_1.Get)(':repoId/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'repoId',
        type: 'number',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: '브랜치 조회',
        description: '브랜치를 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: find_branch_dto_1.ResFindBranchDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "findUserRepo", null);
__decorate([
    (0, common_1.Post)(':repoId/sync'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '브랜치 동기화',
        description: '깃허브 브랜치를 동기화합니다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: sync_branch_dto_1.ResSyncBranchDto,
        status: common_1.HttpStatus.CREATED,
        description: '브랜치를 성공적으로 동기화 하였습니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "syncRepoBranches", null);
exports.BranchController = BranchController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('branch'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiTags)('branch'),
    __metadata("design:paramtypes", [branch_service_1.BranchService])
], BranchController);
//# sourceMappingURL=branch.controller.js.map