import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
export declare class GithubOauthController {
    private jwtAuthService;
    constructor(jwtAuthService: JwtAuthService);
    githubAuth(): Promise<void>;
    githubAuthCallback(req: Request, res: Response): Promise<{
        access_token: any;
    }>;
}
