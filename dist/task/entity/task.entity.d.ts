import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { SprintEntity } from 'src/sprint/entity/sprint.entity';
export declare class TaskEntity extends BaseEntity {
    id: number;
    user: UserEntity;
    repo: RepoEntity;
    sprint: SprintEntity;
    title: string;
    content: string;
    isIssue: boolean;
}
