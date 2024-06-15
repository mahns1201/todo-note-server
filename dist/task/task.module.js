"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const task_controller_1 = require("./task.controller");
const task_service_1 = require("./task.service");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const task_dao_1 = require("./task.dao");
const repo_module_1 = require("../repo/repo.module");
const repo_service_1 = require("../repo/repo.service");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const github_module_1 = require("../github/github.module");
const github_service_1 = require("../github/github.service");
const sprint_module_1 = require("../sprint/sprint.module");
const sprint_service_1 = require("../sprint/sprint.service");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            repo_module_1.RepoModule,
            user_module_1.UserModule,
            github_module_1.GithubModule,
            sprint_module_1.SprintModule,
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.TaskEntity]),
        ],
        controllers: [task_controller_1.TaskController],
        providers: [
            task_service_1.TaskService,
            task_dao_1.TaskDao,
            repo_service_1.RepoService,
            user_service_1.UserService,
            github_service_1.GithubService,
            sprint_service_1.SprintService,
        ],
        exports: [task_dao_1.TaskDao],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map