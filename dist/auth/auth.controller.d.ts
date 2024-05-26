import { AuthService } from './auth.service';
import { GetGithubTokenByCodeDto, ResGetGithubTokenDto } from './dto/get-github-token.dto';
import { ResLoginDto } from './dto/login.dto';
import { ResPayloadDto } from './dto/payload.dto';
import { ResGetGithubLoginUrlDto } from './dto/get-github-login-url.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<ResLoginDto>;
    getProfile(req: any): ResPayloadDto;
    getGithubLoginUrl(): ResGetGithubLoginUrlDto;
    getGithubTokenByCode(query: GetGithubTokenByCodeDto): Promise<ResGetGithubTokenDto>;
}
