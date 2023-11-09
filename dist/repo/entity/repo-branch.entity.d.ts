import { BaseEntity } from 'src/common/common.entity';
import { RepoEntity } from './repo.entity';
export declare class RepoBranchEntity extends BaseEntity {
    id: number;
    repo: RepoEntity;
    branchName: string;
}
