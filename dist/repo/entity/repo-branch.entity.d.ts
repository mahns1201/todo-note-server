import { BaseEntity } from 'src/common/common.entity';
import { RepoEntity } from './repo.entity';
export declare class RepoBranchEntity extends BaseEntity {
    repo: RepoEntity;
    branchName: string;
}
