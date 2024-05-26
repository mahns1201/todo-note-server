import { RepoService } from './repo.service';
import { CreateRepoDto, ResCreateRepoDto } from './dto/create-repo.dto';
import { ResFindRepoDto } from './dto/find-repo.dto';
import { ResFindReposDto } from './dto/find-repos.dto';
import { ResSyncRepoDto } from './dto/sync-repo.dto';
export declare class RepoController {
    private repoService;
    constructor(repoService: RepoService);
    createRepo(req: any, body: CreateRepoDto): Promise<ResCreateRepoDto>;
    findUserRepos(req: any, query: any): Promise<ResFindReposDto>;
    findUserRepo(req: any, param: any): Promise<ResFindRepoDto>;
    syncUserRepos(req: any): Promise<ResSyncRepoDto>;
}
