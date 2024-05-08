import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-github';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../jwt/auth.service';
declare const GithubOauthStrategy_base: new (...args: any[]) => any;
export declare class GithubOauthStrategy extends GithubOauthStrategy_base {
    private configService;
    private userService;
    private authService;
    constructor(configService: ConfigService, userService: UserService, authService: AuthService);
    validate(githubAccessToken: string, _refreshToken: string, profile: Profile): Promise<{
        user: UserEntity;
        accessToken: string;
        createdUser?: undefined;
    } | {
        createdUser: UserEntity;
        accessToken: string;
        user?: undefined;
    }>;
}
export {};
