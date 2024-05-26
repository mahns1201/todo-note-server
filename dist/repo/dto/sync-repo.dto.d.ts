import { RepoDto } from './repo.dto';
import { ResDto } from 'src/common/dto/res.dto';
declare const SyncRepoDto_base: import("@nestjs/common").Type<Pick<RepoDto, "userId">>;
export declare class SyncRepoDto extends SyncRepoDto_base {
}
export declare class ResSyncRepoDto extends ResDto {
    items: string[];
}
export {};
