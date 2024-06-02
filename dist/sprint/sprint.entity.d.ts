import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/user.entity';
import { RepoEntity } from 'src/repo/repo.entity';
export declare class SprintEntity extends BaseEntity {
    user: UserEntity;
    userId: number;
    repo: RepoEntity;
    repoId: number;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
}
