import { HttpStatus } from '@nestjs/common';
import { GithubService } from './github.service';
import { UserService } from 'src/user/user.service';
import { jwtUserT } from 'src/constant/jwt.constant';
export declare class GithubController {
    private githubService;
    private userService;
    constructor(githubService: GithubService, userService: UserService);
    findGithubRepos(user: jwtUserT): Promise<{
        httpStatus: HttpStatus;
        message: string;
        items: any;
    }>;
    findOneRepo(user: jwtUserT, param: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    createRepo(user: jwtUserT, body: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        items: any;
    }>;
    updateRepo(user: jwtUserT, param: any, body: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    deleteRepo(user: jwtUserT, param: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    findAllMilestones(user: jwtUserT, param: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        items: any;
    }>;
    findOneMilestone(user: jwtUserT, param: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    createMilestone(user: jwtUserT, param: any, body: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    updateMilestone(user: jwtUserT, param: any, body: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    deleteMilestone(user: jwtUserT, param: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    findAllIssues(user: jwtUserT, param: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        items: any;
    }>;
    findOneIssue(user: jwtUserT, param: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
    createIssue(user: jwtUserT, param: any, body: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        items: any;
    }>;
    updateIssues(user: jwtUserT, param: any, body: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: any;
    }>;
}
