import { Repository } from 'typeorm';
import { SprintEntity } from './sprint.entity';
import { CreateSprintDto } from './dto/create-sprint.dto';
export declare class SprintDao {
    private sprintRepository;
    constructor(sprintRepository: Repository<SprintEntity>);
    create(dto: CreateSprintDto): Promise<SprintEntity>;
    findById(id: number): Promise<SprintEntity>;
    find(dto: any): Promise<[SprintEntity[], number]>;
}
