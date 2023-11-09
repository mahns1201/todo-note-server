import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-github';
declare const GithubOauthStrategy_base: new (...args: any[]) => any;
export declare class GithubOauthStrategy extends GithubOauthStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, _refreshToken: string, profile: Profile): Promise<Profile>;
}
export {};
