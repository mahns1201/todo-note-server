import { UserService } from 'src/user/user.service';
export declare class GithubService {
    private userService;
    constructor(userService: UserService);
    findRepos(input: any): Promise<{
        items: any;
    }>;
    findOneRepo(input: any): Promise<{
        item: any;
    }>;
    createRepo(input: any): Promise<{
        item: any;
    }>;
    updateRepo(input: any): Promise<{
        item: any;
    }>;
    deleteRepo(input: any): Promise<{
        item: any;
    }>;
    findMilestones(input: any): Promise<{
        items: any;
    }>;
    findOneMilestone(input: any): Promise<{
        item: any;
    }>;
    createMilestone(input: any): Promise<{
        item: any;
    }>;
    updateMilestone(input: any): Promise<{
        item: any;
    }>;
    deleteMilestone(input: any): Promise<{
        item: any;
    }>;
    findIssues(input: any): Promise<{
        items: any;
    }>;
    findOneIssue(input: any): Promise<{
        item: any;
    }>;
    createIssue(input: any): Promise<{
        item: any;
    }>;
    updateIssue(input: any): Promise<{
        item: any;
    }>;
}
