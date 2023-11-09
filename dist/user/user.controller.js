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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const find_user_dto_1 = require("./dto/find-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(input) {
        const { item } = await this.userService.createUser(input);
        const httpStatus = !item
            ? common_1.HttpStatus.INTERNAL_SERVER_ERROR
            : common_1.HttpStatus.CREATED;
        const message = !item
            ? '유저 생성에 실패했습니다.'
            : '유저가 성공적으로 생성되었습니다.';
        const result = { item, httpStatus, message };
        return result;
    }
    async findOne(input) {
        const { item } = await this.userService.findUser(input);
        const httpStatus = !item ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.OK;
        const message = !item
            ? '유저를 해당 이메일로 찾을 수 없습니다.'
            : '유저를 성공적으로 찾았습니다.';
        const result = { item, httpStatus, message };
        return result;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '유저 생성',
        description: '새로운 유저를 생성합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        type: find_user_dto_1.OutputFindUserDto,
        status: common_1.HttpStatus.CREATED,
        description: '유저를 성공적으로 생성하였습니다.',
    }),
    (0, swagger_1.ApiResponse)({
        type: find_user_dto_1.OutputFindUserDto,
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: '유저를  알 수 없는 이유로 생성할 수 없습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.InputCreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '유저 조회',
        description: 'parameter에 email을 넘겨 유저를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        type: find_user_dto_1.OutputFindUserDto,
        status: common_1.HttpStatus.OK,
        description: '성공적으로 유저를 찾았을 때 반환합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        type: find_user_dto_1.OutputFindUserDto,
        status: common_1.HttpStatus.NOT_FOUND,
        description: '이메일로 유저를 찾을 수 없을 때 반환합니다.',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.InputFindUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map