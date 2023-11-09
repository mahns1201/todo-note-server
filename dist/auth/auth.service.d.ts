import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly configService;
    constructor(configService: ConfigService);
    getGithubClientId(): Promise<string>;
    getGithubClientSecret(): Promise<string>;
    getCallbackUrl(): Promise<string>;
    validateOAuthLogin(profile: any): Promise<any>;
}
