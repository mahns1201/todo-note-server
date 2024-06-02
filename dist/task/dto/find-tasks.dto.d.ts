import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';
export declare class FindTasksDto extends PagingReqDto {
    userId: number;
}
export declare class ResFindTasksDto extends ResDto {
    items: ResTaskDto[];
}
