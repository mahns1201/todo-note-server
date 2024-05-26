import { BaseDto } from 'src/common/common.dto';
export declare class BranchDto extends BaseDto {
    repoId: number;
    userId: number;
    branchName: string;
}
declare const ResBranchDto_base: import("@nestjs/common").Type<Pick<BranchDto, "id" | "createdAt" | "updatedAt" | "userId" | "branchName">>;
export declare class ResBranchDto extends ResBranchDto_base {
}
export {};
