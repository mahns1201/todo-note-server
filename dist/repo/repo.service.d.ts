import { RepoDao } from './repo.dao';
import { FindRepoByIdDto } from './dto/find-repo.dto';
import { CreateRepoDto } from './dto/create-repo.dto';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';
import { SyncRepoDto } from './dto/sync-repo.dto';
import { FindReposDto } from './dto/find-repos.dto';
export declare class RepoService {
    private readonly repoDao;
    private readonly userService;
    private readonly githubService;
    constructor(repoDao: RepoDao, userService: UserService, githubService: GithubService);
    createRepo(dto: CreateRepoDto): Promise<import("./repo.entity").RepoEntity>;
    findRepo(dto: FindRepoByIdDto): Promise<import("./repo.entity").RepoEntity>;
    findRepos(dto: FindReposDto): Promise<[import("./repo.entity").RepoEntity[], number]>;
    syncUserRepos(dto: SyncRepoDto): Promise<{
        syncRepoNames: any[];
        syncCount: number;
    }>;
}
