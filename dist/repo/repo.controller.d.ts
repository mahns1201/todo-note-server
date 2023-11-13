import { HttpStatus } from '@nestjs/common';
import { RepoService } from './repo.service';
import { UserService } from 'src/user/user.service';
export declare class RepoController {
    private repoService;
    private userService;
    constructor(repoService: RepoService, userService: UserService);
    findUserRepos(request: any): Promise<{
        items: [import("./entity/repo.entity").RepoEntity[], number];
        message: string;
        httpStatus: HttpStatus;
    }>;
    getReposFromGithub(request: any): Promise<{
        items: any;
        message: string;
        httpStatus: HttpStatus;
    }>;
    syncRepos(request: any): Promise<{
        message: string;
        httpStatus: HttpStatus;
    }>;
    syncRepoBranch(request: any, input: any): Promise<{
        message: string;
        httpStatus: HttpStatus;
    }>;
}
