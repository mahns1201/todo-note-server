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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/jwt/auth.guard");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadFile(file, request, param) {
        const { id: userId } = request.user;
        const { id: taskId } = param;
        const { s3Response: { Location: url }, originalname, mimetype, encoding, } = await this.uploadService.uploadFile(file);
        const { item } = await this.uploadService.createUpload({
            userId,
            taskId,
            originalname,
            encoding,
            mimetype,
            url,
        });
        const httpStatus = !item
            ? common_1.HttpStatus.INTERNAL_SERVER_ERROR
            : common_1.HttpStatus.CREATED;
        const message = !item
            ? '파일 업로드를 실패하였습니다.'
            : '파일 업로드를 성공하였습니다.';
        return { item, httpStatus, message };
    }
};
__decorate([
    (0, common_1.Post)('upload/task/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiHeader)({
        name: 'JWT',
        description: 'Bearer JWT 토큰을 해더에 담아서 요청',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'taskId',
    }),
    (0, swagger_1.ApiOperation)({
        summary: '업로드 생성',
        description: '파일을 s3에 업로드하고 upload db를 생성합니다.',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
UploadController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map