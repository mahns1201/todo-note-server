import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResRepoDto } from './repo.dto';
export declare class FindReposDto extends PagingReqDto {
    userId: number;
}
export declare class ResFindReposDto extends ResDto {
    items: ResRepoDto[];
}
