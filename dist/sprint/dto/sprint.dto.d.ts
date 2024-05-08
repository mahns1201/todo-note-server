import { BaseTimeDto } from 'src/common/common.dto';
export declare class SprintDto extends BaseTimeDto {
    id: number;
    user: number;
    repo: number;
    title: string;
    description: string;
    startAt: Date | string;
    endAt: Date | string;
}
