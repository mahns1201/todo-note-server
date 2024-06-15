import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/user.entity';
import { RepoEntity } from 'src/repo/repo.entity';
import { SprintEntity } from 'src/sprint/sprint.entity';
export declare class TaskEntity extends BaseEntity {
    user: UserEntity;
    userId: number;
    repo: RepoEntity;
    repoId: number;
    sprints: SprintEntity[];
    title: string;
    content: string;
    isGithubIssue: boolean;
    isClosed: boolean;
}
