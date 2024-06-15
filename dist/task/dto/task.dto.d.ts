import { BaseDto } from 'src/common/common.dto';
export declare class TaskDto extends BaseDto {
    userId: number;
    repoId: number;
    title: string;
    content: string;
    isGithubIssue: boolean;
}
export declare class ResTaskDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    repoId: number;
    title: string;
    content: string;
    isGithubIssue: boolean;
    repoName: string;
    repoHtmlUrl: string;
    repoOwnerAvatarUrl: string;
    repoSynchronizedAt: Date;
}
