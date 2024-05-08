import { UserService } from 'src/user/user.service';
import { SprintService } from './sprint.service';
import { InputCreateSprintDto, OutputCreateSprintDto } from './dto/create-sprint.dto';
import { jwtUserT } from 'src/constant/jwt.constant';
import { RepoService } from 'src/repo/repo.service';
import { PagingRequestDto } from 'src/common/common.dto';
import { OutputFindSprintsDto } from './dto/find-sprint.dto';
export declare class SprintController {
    private sprintService;
    private userService;
    private repoService;
    constructor(sprintService: SprintService, userService: UserService, repoService: RepoService);
    create(user: jwtUserT, input: InputCreateSprintDto): Promise<OutputCreateSprintDto>;
    find(user: jwtUserT, query: PagingRequestDto): Promise<OutputFindSprintsDto>;
}
