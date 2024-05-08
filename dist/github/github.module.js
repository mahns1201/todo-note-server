"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const github_service_1 = require("./github.service");
const github_controller_1 = require("./github.controller");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entity/user.entity");
const repo_service_1 = require("../repo/repo.service");
const repo_entity_1 = require("../repo/entity/repo.entity");
const repo_branch_entity_1 = require("../repo/entity/repo-branch.entity");
let GithubModule = class GithubModule {
};
GithubModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, repo_entity_1.RepoEntity, repo_branch_entity_1.RepoBranchEntity]),
        ],
        controllers: [github_controller_1.GithubController],
        providers: [github_service_1.GithubService, user_service_1.UserService, repo_service_1.RepoService],
    })
], GithubModule);
exports.GithubModule = GithubModule;
//# sourceMappingURL=github.module.js.map