import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/user.entity';
import { BranchEntity } from 'src/branch/branch.entity';
import { TaskEntity } from 'src/task/task.entity';
import { SprintEntity } from 'src/sprint/sprint.entity';
export declare class RepoEntity extends BaseEntity {
    branches: BranchEntity[];
    tasks: TaskEntity[];
    sprints: SprintEntity[];
    user: UserEntity;
    userId: number;
    repoName: string;
    defaultBranch: string;
    htmlUrl: string;
    isPrivate: boolean;
    isFork: boolean;
    imageUrl: string;
    description: string;
    language: string;
    ownerAvatarUrl: string;
    synchronizedAt: Date;
}
