import { BaseEntity } from 'src/common/common.entity';
import { RepoEntity } from 'src/repo/repo.entity';
import { SprintEntity } from 'src/sprint/sprint.entity';
import { TaskEntity } from 'src/task/task.entity';
import { BranchEntity } from 'src/branch/branch.entity';
export declare class UserEntity extends BaseEntity {
    repos: RepoEntity[];
    branches: BranchEntity[];
    sprints: SprintEntity[];
    tasks: TaskEntity[];
    email: string;
    githubId: string;
    password: string;
    avatarUrl: string;
    isGithub: boolean;
    githubToken: string;
}
