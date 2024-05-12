import { GithubOauthService } from './github-oauth.service';
export declare class GithubOauthController {
    private githubOauthService;
    constructor(githubOauthService: GithubOauthService);
    githubLoginUrl(): {
        item: string;
    };
    getAccessToken(query: any): Promise<{
        item: {
            accessToken: string;
        };
    }>;
}
