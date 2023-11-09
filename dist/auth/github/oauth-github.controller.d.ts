import { Request, Response } from 'express';
export declare class GithubOauthController {
    githubAuth(): Promise<void>;
    githubAuthCallback(req: Request, res: Response): Promise<string>;
}
