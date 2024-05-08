import { SprintDto } from './sprint.dto';
import { BaseResponseDto } from 'src/common/common.dto';
import { SprintEntity } from '../entity/sprint.entity';
declare const InputCreateSprintDto_base: import("@nestjs/common").Type<Omit<SprintDto, "id" | "createdAt" | "updatedAt" | "deletedAt" | "user">>;
export declare class InputCreateSprintDto extends InputCreateSprintDto_base {
}
export declare class OutputCreateSprintDto extends BaseResponseDto {
    item: SprintEntity;
}
export {};
