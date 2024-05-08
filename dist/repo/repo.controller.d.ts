import { HttpStatus } from '@nestjs/common';
import { RepoService } from './repo.service';
import { UserService } from 'src/user/user.service';
import { jwtUserT } from 'src/constant/jwt.constant';
import { PagingRequestDto } from 'src/common/common.dto';
import { Response } from 'express';
export declare class RepoController {
    private repoService;
    private userService;
    constructor(repoService: RepoService, userService: UserService);
    findUserRepos(user: jwtUserT, query: PagingRequestDto): Promise<{
        httpStatus: HttpStatus;
        message: string;
        currentPage: number;
        limit: number;
        totalCount: number;
        items: import("./entity/repo.entity").RepoEntity[];
    }>;
    syncRepoByGithub(user: jwtUserT, res: Response): Promise<void>;
}
