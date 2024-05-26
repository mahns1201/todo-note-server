import { Repository } from 'typeorm';
import { BranchEntity } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
export declare class BranchDao {
    private branchRepository;
    constructor(branchRepository: Repository<BranchEntity>);
    create(dto: CreateBranchDto): Promise<BranchEntity>;
    findById(id: number): Promise<BranchEntity>;
    findAllByRepoId(repoId: number): Promise<BranchEntity[]>;
}
