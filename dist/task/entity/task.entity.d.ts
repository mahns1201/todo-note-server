import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { RepoBranchEntity } from 'src/repo/entity/repo-branch.entity';
export declare class TaskEntity extends BaseEntity {
    id: number;
    user: UserEntity;
    repo: RepoEntity;
    repoBranch: RepoBranchEntity;
    title: string;
    content: string;
}
