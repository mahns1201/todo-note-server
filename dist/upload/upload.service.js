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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const AWS = require("aws-sdk");
const upload_entity_1 = require("./entity/upload.entity");
const typeorm_2 = require("typeorm");
let UploadService = class UploadService {
    constructor(uploadRepository, configService) {
        this.uploadRepository = uploadRepository;
        this.configService = configService;
        this.AWS_S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
        });
    }
    async uploadFile(file) {
        const { buffer, originalname, mimetype, encoding } = file;
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(`${new Date()}_${originalname}`),
            Body: buffer,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };
        try {
            const s3Response = await this.s3.upload(params).promise();
            return { s3Response, originalname, mimetype, encoding };
        }
        catch (error) {
            common_1.Logger.error(error.message);
            throw new Error(error);
        }
    }
    async createUpload(input) {
        const { userId, taskId, originalname, encoding, mimetype, url } = input;
        const newUpload = this.uploadRepository.create({
            user: userId,
            task: taskId,
            originalname,
            encoding,
            mimetype,
            url,
        });
        const result = await this.uploadRepository.save(newUpload);
        return { item: result };
    }
    async findUploadByTaskId(input) {
        const { taskId, userId } = input;
        const upload = await this.uploadRepository
            .createQueryBuilder('upload')
            .where('upload.taskId = :taskId', { taskId })
            .where('upload.userId = :userId', { userId })
            .getRawMany();
        return { item: upload };
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(upload_entity_1.UploadEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map