import { ConfigService } from '@nestjs/config';
import { GithubService } from 'src/github/github.service';
import { UserDao } from 'src/user/user.dao';
import { AuthService } from '../auth.service';
declare const GithubStrategy_base: new (...args: any[]) => any;
export declare class GithubStrategy extends GithubStrategy_base {
    private readonly configService;
    private readonly authService;
    private readonly userDao;
    private readonly githubService;
    constructor(configService: ConfigService, authService: AuthService, userDao: UserDao, githubService: GithubService);
    validate(githubToken: string, _refreshToken: string, profile: any, done: any): Promise<void>;
}
export {};
