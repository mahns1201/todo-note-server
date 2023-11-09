import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/entity/user.entity';
export declare class RepoEntity extends BaseEntity {
    id: number;
    user: UserEntity;
    repoName: string;
}
