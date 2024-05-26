import { ResDto } from 'src/common/dto/res.dto';
import { ResBranchDto } from './branch.dto';
export declare class FindBranchByIdDto {
    userId: number;
    repoId: number;
    id: number;
}
export declare class ResFindBranchDto extends ResDto {
    item: ResBranchDto;
}
