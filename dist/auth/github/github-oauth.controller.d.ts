import { GithubOauthService } from './github-oauth.service';
import { OutputGithubCallbackDto } from './dto/github-callback.dto';
export declare class GithubOauthController {
    private githubOauthService;
    constructor(githubOauthService: GithubOauthService);
    githubLoginUrl(): {
        item: string;
    };
    githubAuth(): Promise<void>;
    githubAuthCallback(req: any): Promise<OutputGithubCallbackDto>;
}
