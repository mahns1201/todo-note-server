import { Repository } from 'typeorm';
import { RepoEntity } from './repo.entity';
import { CreateRepoDto } from './dto/create-repo.dto';
export declare class RepoDao {
    private repoRepository;
    constructor(repoRepository: Repository<RepoEntity>);
    create(dto: CreateRepoDto): Promise<RepoEntity>;
    findById(id: number, userId: number): Promise<RepoEntity>;
    find(dto: any): Promise<[RepoEntity[], number]>;
    findAllByUserId(userId: number): Promise<RepoEntity[]>;
}
