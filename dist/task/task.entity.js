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
exports.TaskEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const common_entity_1 = require("../common/common.entity");
const user_entity_1 = require("../user/user.entity");
const repo_entity_1 = require("../repo/repo.entity");
const sprint_entity_1 = require("../sprint/sprint.entity");
let TaskEntity = class TaskEntity extends common_entity_1.BaseEntity {
};
exports.TaskEntity = TaskEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.tasks),
    __metadata("design:type", user_entity_1.UserEntity)
], TaskEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => repo_entity_1.RepoEntity, (repo) => repo.tasks),
    __metadata("design:type", repo_entity_1.RepoEntity)
], TaskEntity.prototype, "repo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "repoId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => sprint_entity_1.SprintEntity, (sprint) => sprint.tasks),
    (0, typeorm_1.JoinTable)({
        name: 'task_sprints',
        joinColumn: { name: 'taskId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'sprintId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], TaskEntity.prototype, "sprints", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskEntity.prototype, "isGithubIssue", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskEntity.prototype, "isClosed", void 0);
exports.TaskEntity = TaskEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'task' })
], TaskEntity);
//# sourceMappingURL=task.entity.js.map