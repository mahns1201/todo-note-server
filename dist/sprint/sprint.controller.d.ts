import { SprintService } from './sprint.service';
import { CreateSprintDto, ResCreateSprintDto } from './dto/create-sprint.dto';
import { ResFindSprintDto } from './dto/find-sprint.dto';
import { PagingReqDto } from 'src/common/common.dto';
import { ResFindSprintsDto } from './dto/find-sprints.dto';
export declare class SprintController {
    private sprintService;
    constructor(sprintService: SprintService);
    serialize(sprint: any): {
        id: any;
        createdAt: any;
        updatedAt: any;
        userId: any;
        repoId: any;
        title: any;
        description: any;
        startAt: any;
        endAt: any;
        repoName: any;
        repoHtmlUrl: any;
        repoOwnerAvatarUrl: any;
        repoSynchronizedAt: any;
    };
    createSprint(req: any, param: any, body: CreateSprintDto): Promise<ResCreateSprintDto>;
    getUpcomingSprintList(req: any, query: PagingReqDto): Promise<ResFindSprintsDto>;
    getSprintList(req: any, query: PagingReqDto): Promise<ResFindSprintsDto>;
    findSprint(req: any, param: any): Promise<ResFindSprintDto>;
}
