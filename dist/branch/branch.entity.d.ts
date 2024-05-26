import { BaseEntity } from 'src/common/common.entity';
import { RepoEntity } from '../repo/repo.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class BranchEntity extends BaseEntity {
    repo: RepoEntity;
    repoId: number;
    user: UserEntity;
    userId: number;
    branchName: string;
}
