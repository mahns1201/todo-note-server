import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResSprintDto } from './sprint.dto';
export declare class FindSprintsDto extends PagingReqDto {
    userId: number;
    where?: object;
}
export declare class ResFindSprintsDto extends ResDto {
    items: ResSprintDto[];
}
