import { SprintEntity } from './entity/sprint.entity';
import { Repository } from 'typeorm';
import { InputCreateSprintDto } from './dto/create-sprint.dto';
import { ServicePagingResultDto, ServiceResultDto } from 'src/common/common.dto';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { InputFindSprintsDto } from './dto/find-sprint.dto';
export declare class SprintService {
    private sprintRepository;
    constructor(sprintRepository: Repository<SprintEntity>);
    create(input: InputCreateSprintDto, repo: RepoEntity): Promise<ServiceResultDto<SprintEntity>>;
    find(input: InputFindSprintsDto): Promise<ServicePagingResultDto<SprintEntity[]>>;
}
