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
exports.SprintEntity = void 0;
const common_entity_1 = require("../common/common.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../user/user.entity");
const repo_entity_1 = require("../repo/repo.entity");
const task_entity_1 = require("../task/task.entity");
let SprintEntity = class SprintEntity extends common_entity_1.BaseEntity {
};
exports.SprintEntity = SprintEntity;
__decorate([
    (0, typeorm_1.ManyToMany)(() => task_entity_1.TaskEntity, (task) => task.sprints),
    __metadata("design:type", Array)
], SprintEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.sprints),
    __metadata("design:type", user_entity_1.UserEntity)
], SprintEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SprintEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => repo_entity_1.RepoEntity, (repo) => repo.sprints),
    __metadata("design:type", repo_entity_1.RepoEntity)
], SprintEntity.prototype, "repo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SprintEntity.prototype, "repoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SprintEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], SprintEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SprintEntity.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SprintEntity.prototype, "endAt", void 0);
exports.SprintEntity = SprintEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sprint' })
], SprintEntity);
//# sourceMappingURL=sprint.entity.js.map