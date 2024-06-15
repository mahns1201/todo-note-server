import { ResDto } from 'src/common/dto/res.dto';
import { ResSprintProgressDto } from './sprint.dto';
export declare class FindSprintByIdDto {
    userId: number;
    id: number;
}
export declare class ResFindSprintDto extends ResDto {
    item: ResSprintProgressDto;
}
