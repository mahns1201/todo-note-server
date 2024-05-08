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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const find_user_dto_1 = require("./dto/find-user.dto");
const auth_guard_1 = require("../auth/jwt/auth.guard");
const common_dto_1 = require("../common/common.dto");
const user_decorator_1 = require("../decorator/user.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findOne(jUser) {
        const { id } = jUser;
        const { item: user } = await this.userService.findOne({ id });
        const { password, githubAccessToken } = user, outputUser = __rest(user, ["password", "githubAccessToken"]);
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: '유저를 성공적으로 찾았습니다',
            item: outputUser,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'JWT 토큰으로 유저를 조회한다.' }),
    (0, swagger_1.ApiOkResponse)({
        type: find_user_dto_1.OutputFindUserDto,
        status: common_1.HttpStatus.OK,
    }),
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
    (0, swagger_1.ApiNotFoundResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.NOT_FOUND,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiTags)('USER'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map