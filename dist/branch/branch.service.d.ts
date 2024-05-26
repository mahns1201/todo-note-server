import { BranchDao } from './branch.dao';
import { CreateBranchDto } from './dto/create-branch.dto';
import { FindBranchByIdDto } from './dto/find-branch.dto';
import { RepoService } from 'src/repo/repo.service';
import { GithubService } from 'src/github/github.service';
import { UserService } from 'src/user/user.service';
import { SyncBranchDto } from './dto/sync-branch.dto';
export declare class BranchService {
    private readonly branchDao;
    private readonly userService;
    private readonly repoService;
    private readonly githubService;
    constructor(branchDao: BranchDao, userService: UserService, repoService: RepoService, githubService: GithubService);
    createBranch(dto: CreateBranchDto): Promise<import("./branch.entity").BranchEntity>;
    findBranch(dto: FindBranchByIdDto): Promise<import("./branch.entity").BranchEntity>;
    syncRepoBranches(dto: SyncBranchDto): Promise<{
        syncBranchNames: any[];
        syncCount: number;
    }>;
}
