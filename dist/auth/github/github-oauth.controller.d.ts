import { Request } from 'express';
import { OutputGithubCallbackDto } from './dto/github-callback.dto';
export declare class GithubOauthController {
    githubAuth(): Promise<void>;
    githubAuthCallback(req: Request): Promise<OutputGithubCallbackDto>;
}
