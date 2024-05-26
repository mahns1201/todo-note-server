import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';
export declare class AuthService {
    private readonly configService;
    private readonly userService;
    private readonly githubService;
    private readonly jwtService;
    constructor(configService: ConfigService, userService: UserService, githubService: GithubService, jwtService: JwtService);
    validateUserByPassword(email: string, password: string): Promise<{
        id: number;
        createdAt: Date;
        email: string;
        githubId: string;
        avatarUrl: string;
        isGithub: boolean;
        githubToken: string;
    }>;
    signIn(user: any): Promise<string>;
    githubLoginUrl(): string;
    getGithubTokenByCode(code: string): Promise<{
        githubToken: string;
        accessToken: string;
        repos: import("../repo/repo.entity").RepoEntity[];
        branches: import("../branch/branch.entity").BranchEntity[];
        sprints: import("../sprint/sprint.entity").SprintEntity[];
        tasks: import("../task/task.entity").TaskEntity[];
        email: string;
        githubId: string;
        password: string;
        avatarUrl: string;
        isGithub: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        isDeleted: boolean;
    }>;
    githubStrategyLogic(githubToken: string): Promise<{
        githubToken: string;
        accessToken: string;
        repos: import("../repo/repo.entity").RepoEntity[];
        branches: import("../branch/branch.entity").BranchEntity[];
        sprints: import("../sprint/sprint.entity").SprintEntity[];
        tasks: import("../task/task.entity").TaskEntity[];
        email: string;
        githubId: string;
        password: string;
        avatarUrl: string;
        isGithub: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        isDeleted: boolean;
    }>;
}
