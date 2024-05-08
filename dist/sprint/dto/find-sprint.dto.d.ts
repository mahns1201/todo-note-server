import { PagingResponseDto } from 'src/common/common.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { SprintEntity } from '../entity/sprint.entity';
declare const InputFindSprintsDto_base: import("@nestjs/common").Type<Pick<UserDto, "id">>;
export declare class InputFindSprintsDto extends InputFindSprintsDto_base {
    page: number;
    limit: number;
}
export declare class OutputFindSprintsDto extends PagingResponseDto {
    items: SprintEntity[];
}
export {};
