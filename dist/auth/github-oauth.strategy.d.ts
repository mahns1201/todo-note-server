import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-github';
import { AppConfig } from '../../config/interfaces';
import { UsersService } from '../../users/users.service';
declare const GithubOauthStrategy_base: new (...args: any[]) => any;
export declare class GithubOauthStrategy extends GithubOauthStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService<AppConfig>, usersService: UsersService);
    validate(accessToken: string, _refreshToken: string, profile: Profile): Promise<any>;
}
export {};
