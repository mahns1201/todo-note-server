import { TaskService } from './task.service';
import { CreateTaskDto, ResCreateTaskDto } from './dto/create-task.dto';
import { ResFindTaskDto } from './dto/find-task.dto';
import { ResFindTasksDto } from './dto/find-tasks.dto';
import { FindTaskByRepoIdQueryDto } from './dto/find-repo-tasks.dto';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    serialize(task: any): {
        id: any;
        createdAt: any;
        updatedAt: any;
        userId: any;
        repoId: any;
        title: any;
        content: any;
        isGithubIssue: any;
        repoName: any;
        repoHtmlUrl: any;
        repoOwnerAvatarUrl: any;
        repoSynchronizedAt: any;
    };
    createTask(req: any, param: any, body: CreateTaskDto): Promise<ResCreateTaskDto>;
    getTaskListByRepoId(req: any, query: FindTaskByRepoIdQueryDto, param: any): Promise<ResFindTasksDto>;
    findTask(req: any, param: any): Promise<ResFindTaskDto>;
}
