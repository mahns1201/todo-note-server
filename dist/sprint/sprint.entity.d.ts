import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/user.entity';
import { RepoEntity } from 'src/repo/repo.entity';
import { TaskEntity } from 'src/task/task.entity';
export declare class SprintEntity extends BaseEntity {
    tasks: TaskEntity[];
    user: UserEntity;
    userId: number;
    repo: RepoEntity;
    repoId: number;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
}
