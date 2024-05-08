"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const repo_controller_1 = require("./repo.controller");
const repo_service_1 = require("./repo.service");
const repo_entity_1 = require("./entity/repo.entity");
const repo_branch_entity_1 = require("./entity/repo-branch.entity");
const user_service_1 = require("../user/user.service");
let RepoModule = class RepoModule {
};
RepoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([repo_entity_1.RepoEntity, repo_branch_entity_1.RepoBranchEntity, user_entity_1.UserEntity]),
        ],
        controllers: [repo_controller_1.RepoController],
        providers: [repo_service_1.RepoService, user_service_1.UserService],
    })
], RepoModule);
exports.RepoModule = RepoModule;
//# sourceMappingURL=repo.module.js.map