import { HttpStatus } from '@nestjs/common';
import { RepoService } from './repo.service';
import { UserService } from 'src/user/user.service';
import { InputFindUserReposDto } from './dto/find-user-repo.dto';
export declare class RepoController {
    private repoService;
    private userService;
    constructor(repoService: RepoService, userService: UserService);
    findUserRepos(input: InputFindUserReposDto): Promise<{
        items: [import("./entity/repo.entity").RepoEntity[], number];
        message: string;
        httpStatus: HttpStatus;
    }>;
    getReposFromGithub(headers: any): Promise<{
        items: any;
        message: string;
        httpStatus: HttpStatus;
    }>;
    syncRepos(headers: any, input: any): Promise<{
        message: string;
        httpStatus: HttpStatus;
    }>;
    syncRepoBranch(headers: any, input: any): Promise<{
        message: string;
        httpStatus: HttpStatus;
    }>;
}
