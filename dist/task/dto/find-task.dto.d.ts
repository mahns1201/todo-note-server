import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';
export declare class FindTaskByIdDto {
    userId: number;
    id: number;
}
export declare class ResFindTaskDto extends ResDto {
    item: ResTaskDto;
}
