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
const repo_controller_1 = require("./repo.controller");
const repo_service_1 = require("./repo.service");
const repo_dao_1 = require("./repo.dao");
const typeorm_1 = require("@nestjs/typeorm");
const repo_entity_1 = require("./repo.entity");
const user_service_1 = require("../user/user.service");
const github_service_1 = require("../github/github.service");
const user_module_1 = require("../user/user.module");
let RepoModule = class RepoModule {
};
exports.RepoModule = RepoModule;
exports.RepoModule = RepoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([repo_entity_1.RepoEntity]), user_module_1.UserModule],
        controllers: [repo_controller_1.RepoController],
        providers: [repo_service_1.RepoService, repo_dao_1.RepoDao, user_service_1.UserService, github_service_1.GithubService],
        exports: [repo_dao_1.RepoDao],
    })
], RepoModule);
//# sourceMappingURL=repo.module.js.map