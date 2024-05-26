"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchModule = void 0;
const common_1 = require("@nestjs/common");
const branch_controller_1 = require("./branch.controller");
const branch_service_1 = require("./branch.service");
const typeorm_1 = require("@nestjs/typeorm");
const branch_entity_1 = require("./branch.entity");
const branch_dao_1 = require("./branch.dao");
const repo_entity_1 = require("../repo/repo.entity");
const repo_service_1 = require("../repo/repo.service");
const repo_module_1 = require("../repo/repo.module");
const user_service_1 = require("../user/user.service");
const user_module_1 = require("../user/user.module");
const github_service_1 = require("../github/github.service");
let BranchModule = class BranchModule {
};
exports.BranchModule = BranchModule;
exports.BranchModule = BranchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            repo_module_1.RepoModule,
            typeorm_1.TypeOrmModule.forFeature([branch_entity_1.BranchEntity, repo_entity_1.RepoEntity]),
        ],
        controllers: [branch_controller_1.BranchController],
        providers: [
            branch_service_1.BranchService,
            branch_dao_1.BranchDao,
            repo_service_1.RepoService,
            user_service_1.UserService,
            github_service_1.GithubService,
        ],
        exports: [branch_dao_1.BranchDao],
    })
], BranchModule);
//# sourceMappingURL=branch.module.js.map