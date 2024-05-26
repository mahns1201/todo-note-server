import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';
export declare class CreateTaskDto {
    userId: number;
    repoId: number;
    sprintId: number;
    title: string;
    content: string;
    isGithubIssue: boolean;
}
export declare class ResCreateTaskDto extends ResDto {
    item: ResTaskDto;
}
