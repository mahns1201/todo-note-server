import { BaseDto } from 'src/common/common.dto';
export declare class SprintDto extends BaseDto {
    userId: number;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
}
export declare class ResSprintDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    repoId: number;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
    repoName: string;
    repoHtmlUrl: string;
    repoOwnerAvatarUrl: string;
    repoSynchronizedAt: Date;
}
export declare class ResSprintProgressDto extends ResSprintDto {
    totalCount: number;
    openedCount: number;
    closedCount: number;
    progressPercent: number;
}
