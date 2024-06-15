import { RepoService } from './repo.service';
import { CreateRepoDto, ResCreateRepoDto } from './dto/create-repo.dto';
import { PagingReqDto } from 'src/common/common.dto';
import { ResFindRepoDto } from './dto/find-repo.dto';
import { ResFindReposDto } from './dto/find-repos.dto';
import { ResSyncRepoDto } from './dto/sync-repo.dto';
export declare class RepoController {
    private repoService;
    constructor(repoService: RepoService);
    serialize(repo: any): {
        id: any;
        createdAt: any;
        updatedAt: any;
        userId: any;
        repoName: any;
        defaultBranch: any;
        htmlUrl: any;
        isPrivate: any;
        isFork: any;
        imageUrl: any;
        description: any;
        language: any;
        ownerAvatarUrl: any;
        synchronizedAt: any;
    };
    createRepo(req: any, body: CreateRepoDto): Promise<ResCreateRepoDto>;
    findUserRepos(req: any, query: PagingReqDto): Promise<ResFindReposDto>;
    findUserRepo(req: any, param: any): Promise<ResFindRepoDto>;
    syncUserRepos(req: any): Promise<ResSyncRepoDto>;
}
