import { ResDto } from 'src/common/dto/res.dto';
import { ResSprintDto } from './sprint.dto';
export declare class CreateSprintDto {
    userId: number;
    repoId: number;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
}
export declare class ResCreateSprintDto extends ResDto {
    item: ResSprintDto;
}
