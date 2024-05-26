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
exports.RepoEntity = void 0;
const common_entity_1 = require("../common/common.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../user/user.entity");
const branch_entity_1 = require("../branch/branch.entity");
const task_entity_1 = require("../task/task.entity");
let RepoEntity = class RepoEntity extends common_entity_1.BaseEntity {
};
exports.RepoEntity = RepoEntity;
__decorate([
    (0, typeorm_1.OneToMany)(() => branch_entity_1.BranchEntity, (branch) => branch.repo),
    __metadata("design:type", Array)
], RepoEntity.prototype, "branches", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.TaskEntity, (task) => task.repo),
    __metadata("design:type", Array)
], RepoEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.repos),
    __metadata("design:type", user_entity_1.UserEntity)
], RepoEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RepoEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RepoEntity.prototype, "repoName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RepoEntity.prototype, "defaultBranch", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RepoEntity.prototype, "htmlUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RepoEntity.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RepoEntity.prototype, "isFork", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RepoEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], RepoEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RepoEntity.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RepoEntity.prototype, "ownerAvatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], RepoEntity.prototype, "synchronizedAt", void 0);
exports.RepoEntity = RepoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'repo' })
], RepoEntity);
//# sourceMappingURL=repo.entity.js.map