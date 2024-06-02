import { SprintService } from './sprint.service';
import { CreateSprintDto, ResCreateSprintDto } from './dto/create-sprint.dto';
import { ResFindSprintDto } from './dto/find-sprint.dto';
import { ResFindSprintsDto } from './dto/find-sprints.dto';
export declare class SprintController {
    private sprintService;
    constructor(sprintService: SprintService);
    createSprint(req: any, body: CreateSprintDto): Promise<ResCreateSprintDto>;
    getSprintList(req: any, query: any): Promise<ResFindSprintsDto>;
    findSprint(req: any, param: any): Promise<ResFindSprintDto>;
}
