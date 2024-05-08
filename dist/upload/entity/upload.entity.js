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
exports.UploadEntity = void 0;
const class_validator_1 = require("class-validator");
const task_entity_1 = require("../../task/entity/task.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
let UploadEntity = class UploadEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UploadEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.id),
    __metadata("design:type", user_entity_1.UserEntity)
], UploadEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.TaskEntity, (task) => task.id),
    __metadata("design:type", task_entity_1.TaskEntity)
], UploadEntity.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadEntity.prototype, "originalname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadEntity.prototype, "encoding", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadEntity.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadEntity.prototype, "url", void 0);
UploadEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'upload' })
], UploadEntity);
exports.UploadEntity = UploadEntity;
//# sourceMappingURL=upload.entity.js.map