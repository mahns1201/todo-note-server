import { SprintDao } from './sprint.dao';
import { FindSprintByIdDto } from './dto/find-sprint.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
export declare class SprintService {
    private readonly sprintDao;
    constructor(sprintDao: SprintDao);
    createSprint(dto: CreateSprintDto): Promise<import("./sprint.entity").SprintEntity>;
    findSprint(dto: FindSprintByIdDto): Promise<import("./sprint.entity").SprintEntity>;
}
