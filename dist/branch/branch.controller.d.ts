import { BranchService } from './branch.service';
import { CreateBranchDto, ResCreateBranchDto } from './dto/create-branch.dto';
import { ResFindBranchDto } from './dto/find-branch.dto';
import { ResSyncBranchDto } from './dto/sync-branch.dto';
export declare class BranchController {
    private branchService;
    constructor(branchService: BranchService);
    createBranch(req: any, body: CreateBranchDto): Promise<ResCreateBranchDto>;
    findUserRepo(req: any, param: any): Promise<ResFindBranchDto>;
    syncRepoBranches(req: any, param: any): Promise<ResSyncBranchDto>;
}
