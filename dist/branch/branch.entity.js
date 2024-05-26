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
exports.BranchEntity = void 0;
const common_entity_1 = require("../common/common.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const repo_entity_1 = require("../repo/repo.entity");
const user_entity_1 = require("../user/user.entity");
let BranchEntity = class BranchEntity extends common_entity_1.BaseEntity {
};
exports.BranchEntity = BranchEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => repo_entity_1.RepoEntity, (repo) => repo.branches),
    __metadata("design:type", repo_entity_1.RepoEntity)
], BranchEntity.prototype, "repo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], BranchEntity.prototype, "repoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.branches),
    __metadata("design:type", user_entity_1.UserEntity)
], BranchEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], BranchEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BranchEntity.prototype, "branchName", void 0);
exports.BranchEntity = BranchEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'branch' })
], BranchEntity);
//# sourceMappingURL=branch.entity.js.map