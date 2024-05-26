"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const repo_module_1 = require("./repo/repo.module");
const branch_module_1 = require("./branch/branch.module");
const sprint_module_1 = require("./sprint/sprint.module");
const task_module_1 = require("./task/task.module");
const github_module_1 = require("./github/github.module");
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(req, res, next) {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(`${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`);
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `./.env`,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'mysql',
                    host: process.env.MYSQL_HOST,
                    port: parseInt(process.env.MYSQL_PORT, 10),
                    database: process.env.MYSQL_DATABASE,
                    username: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            repo_module_1.RepoModule,
            branch_module_1.BranchModule,
            sprint_module_1.SprintModule,
            task_module_1.TaskModule,
            github_module_1.GithubModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map