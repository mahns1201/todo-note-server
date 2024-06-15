import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';
export declare class FindTasksByRepoIdDto extends PagingReqDto {
    userId: number;
    repoId: number;
    sprintId?: number;
}
export declare class FindTaskByRepoIdQueryDto extends PagingReqDto {
    sprintId?: number;
}
export declare class ResFindTasksDto extends ResDto {
    items: ResTaskDto[];
}
