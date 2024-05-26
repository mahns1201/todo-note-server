import { BaseDto } from 'src/common/common.dto';
export declare class SprintDto extends BaseDto {
    userId: number;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
}
declare const ResSprintDto_base: import("@nestjs/common").Type<Pick<SprintDto, "description" | "title" | "id" | "createdAt" | "updatedAt" | "userId" | "startAt" | "endAt">>;
export declare class ResSprintDto extends ResSprintDto_base {
}
export {};
