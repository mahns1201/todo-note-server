import { ConfigService } from '@nestjs/config';
import { AuthService } from '../jwt/auth.service';
import { UserService } from 'src/user/user.service';
export declare class GithubOauthService {
    private configService;
    private userService;
    private authService;
    constructor(configService: ConfigService, userService: UserService, authService: AuthService);
    githubLoginUrl(): {
        item: string;
    };
    getGithubAccessToken(code: any): Promise<any>;
    githubStrategyLogic(githubAccessToken: any): Promise<string>;
}
