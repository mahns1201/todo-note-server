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
const task_entity_1 = require("./entity/task.entity");
const typeorm_1 = require("@nestjs/typeorm");
const upload_service_1 = require("../upload/upload.service");
const upload_entity_1 = require("../upload/entity/upload.entity");
const repo_service_1 = require("../repo/repo.service");
const repo_entity_1 = require("../repo/entity/repo.entity");
const repo_branch_entity_1 = require("../repo/entity/repo-branch.entity");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entity/user.entity");
let TaskModule = class TaskModule {
};
TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                task_entity_1.TaskEntity,
                user_entity_1.UserEntity,
                repo_entity_1.RepoEntity,
                repo_branch_entity_1.RepoBranchEntity,
                upload_entity_1.UploadEntity,
            ]),
        ],
        controllers: [task_controller_1.TaskController],
        providers: [task_service_1.TaskService, user_service_1.UserService, repo_service_1.RepoService, upload_service_1.UploadService],
    })
], TaskModule);
exports.TaskModule = TaskModule;
//# sourceMappingURL=task.module.js.map