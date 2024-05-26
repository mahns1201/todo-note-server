import { SprintService } from './sprint.service';
import { CreateSprintDto, ResCreateSprintDto } from './dto/create-sprint.dto';
import { ResFindSprintDto } from './dto/find-sprint.dto';
export declare class SprintController {
    private sprintService;
    constructor(sprintService: SprintService);
    createSprint(req: any, body: CreateSprintDto): Promise<ResCreateSprintDto>;
    findSprint(req: any, param: any): Promise<ResFindSprintDto>;
}
