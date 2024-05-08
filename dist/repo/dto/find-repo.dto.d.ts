import { PagingResponseDto } from 'src/common/common.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { RepoDto } from './repo.dto';
declare const OutputReposDto_base: import("@nestjs/common").Type<Omit<RepoDto, "user">>;
export declare class OutputReposDto extends OutputReposDto_base {
}
declare const InputFindRepoDto_base: import("@nestjs/common").Type<Pick<RepoDto, "id">>;
export declare class InputFindRepoDto extends InputFindRepoDto_base {
}
declare const InputFindAllReposDto_base: import("@nestjs/common").Type<Pick<UserDto, "id">>;
export declare class InputFindAllReposDto extends InputFindAllReposDto_base {
}
declare const InputFindReposDto_base: import("@nestjs/common").Type<Pick<UserDto, "id">>;
export declare class InputFindReposDto extends InputFindReposDto_base {
    page: number;
    limit: number;
}
export declare class OutputFindReposDto extends PagingResponseDto {
    items: OutputReposDto;
}
export {};
