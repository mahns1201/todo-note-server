import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/entity/user.entity';
export declare class RepoEntity extends BaseEntity {
    user: UserEntity;
    repoName: string;
    defaultBranch: string;
    htmlUrl: string;
    isPrivate: boolean;
    isFork: boolean;
    description: string;
    language: string;
    ownerAvatarUrl: string;
    synchronizedAt: Date;
}
