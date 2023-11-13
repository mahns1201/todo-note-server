"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const github_oauth_module_1 = require("./auth/github/github-oauth.module");
const repo_module_1 = require("./repo/repo.module");
const auth_module_1 = require("./auth/jwt/auth.module");
const task_module_1 = require("./task/task.module");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `./config/.${process.env.NODE_ENV}.env`,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'mysql',
                    host: process.env.MYSQL_HOST,
                    port: parseInt(process.env.MYSQL_PORT, 10),
                    database: process.env.MYSQL_DATABASE,
                    username: process.env.MYSQL_ROOT_USER,
                    password: process.env.MYSQL_ROOT_PASSWORD,
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            github_oauth_module_1.GithubOauthModule,
            user_module_1.UserModule,
            repo_module_1.RepoModule,
            task_module_1.TaskModule,
            upload_module_1.UploadModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map