import { ResDto } from 'src/common/dto/res.dto';
import { ResBranchDto } from './branch.dto';
export declare class CreateBranchDto {
    userId: number;
    repoId: number;
    branchName: string;
}
export declare class ResCreateBranchDto extends ResDto {
    item: ResBranchDto;
}
