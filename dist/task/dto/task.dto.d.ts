import { BaseDto } from 'src/common/common.dto';
export declare class TaskDto extends BaseDto {
    userId: number;
    repoId: number;
    title: string;
    content: string;
    isGithubIssue: boolean;
}
declare const ResTaskDto_base: import("@nestjs/common").Type<Pick<TaskDto, "title" | "id" | "createdAt" | "updatedAt" | "repoId" | "userId" | "content" | "isGithubIssue">>;
export declare class ResTaskDto extends ResTaskDto_base {
}
export {};
