import { ResDto } from 'src/common/dto/res.dto';
export declare class SyncBranchDto {
    userId: number;
    repoId: number;
}
export declare class ResSyncBranchDto extends ResDto {
    items: string[];
}
