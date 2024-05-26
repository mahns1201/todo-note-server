import { ResDto } from 'src/common/dto/res.dto';
import { ResRepoDto } from './repo.dto';
export declare class FindRepoByIdDto {
    userId: number;
    id: number;
}
export declare class ResFindRepoDto extends ResDto {
    item: ResRepoDto;
}
