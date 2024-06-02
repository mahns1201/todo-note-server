import { SprintDao } from './sprint.dao';
import { FindSprintByIdDto } from './dto/find-sprint.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { RepoService } from 'src/repo/repo.service';
import { FindSprintsDto } from './dto/find-sprints.dto';
export declare class SprintService {
    private readonly sprintDao;
    private readonly repoService;
    constructor(sprintDao: SprintDao, repoService: RepoService);
    createSprint(dto: CreateSprintDto): Promise<import("./sprint.entity").SprintEntity>;
    findSprint(dto: FindSprintByIdDto): Promise<import("./sprint.entity").SprintEntity>;
    findSprints(dto: FindSprintsDto): Promise<[import("./sprint.entity").SprintEntity[], number]>;
}
