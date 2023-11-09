import { SwaggerResponseDto } from 'src/common/common.dto';
import { UserDto } from './user.dto';
declare const InputFindReposDto_base: import("@nestjs/common").Type<Pick<unknown, never>>;
export declare class InputFindReposDto extends InputFindReposDto_base {
}
export declare class OutputFindReposDto extends SwaggerResponseDto<UserDto> {
}
export {};
