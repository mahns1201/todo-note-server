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
exports.SprintController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/jwt/auth.guard");
const user_service_1 = require("../user/user.service");
const sprint_service_1 = require("./sprint.service");
const create_sprint_dto_1 = require("./dto/create-sprint.dto");
const user_decorator_1 = require("../decorator/user.decorator");
const repo_service_1 = require("../repo/repo.service");
const common_dto_1 = require("../common/common.dto");
const find_sprint_dto_1 = require("./dto/find-sprint.dto");
let SprintController = class SprintController {
    constructor(sprintService, userService, repoService) {
        this.sprintService = sprintService;
        this.userService = userService;
        this.repoService = repoService;
    }
    async create(user, input) {
        const { id: userId } = user;
        const { repo: repoId } = input;
        input['user'] = userId;
        const { item: repo } = await this.repoService.findOne({ id: repoId });
        const { item: createdSprint } = await this.sprintService.create(input, repo);
        return {
            httpStatus: common_1.HttpStatus.CREATED,
            message: '스프린트가 성공적으로 생성되었습니다.',
            item: createdSprint,
        };
    }
    async find(user, query) {
        const { page, limit } = query;
        const { items, totalCount } = await this.sprintService.find({
            id: user.id,
            page,
            limit,
        });
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `${page}p 스프린트 리스트를 성공적으로 조회했습니다.`,
            currentPage: page,
            limit,
            totalCount,
            items,
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: '스프린트를 생성한다.' }),
    (0, swagger_1.ApiCreatedResponse)({
        type: create_sprint_dto_1.OutputCreateSprintDto,
        status: common_1.HttpStatus.CREATED,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sprint_dto_1.InputCreateSprintDto]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '유저의 스프린트 리스트를 조회한다.' }),
    (0, swagger_1.ApiOkResponse)({
        type: find_sprint_dto_1.OutputFindSprintsDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, common_dto_1.PagingRequestDto]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "find", null);
SprintController = __decorate([
    (0, common_1.Controller)('sprint'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('sprint'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiBadRequestResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.BAD_REQUEST,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.UNAUTHORIZED,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.NOT_FOUND,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    __metadata("design:paramtypes", [sprint_service_1.SprintService,
        user_service_1.UserService,
        repo_service_1.RepoService])
], SprintController);
exports.SprintController = SprintController;
//# sourceMappingURL=sprint.controller.js.map