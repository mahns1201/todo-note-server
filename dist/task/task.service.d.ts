import { TaskDao } from './task.dao';
import { FindTaskByIdDto } from './dto/find-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { RepoService } from 'src/repo/repo.service';
export declare class TaskService {
    private readonly taskDao;
    private readonly repoService;
    constructor(taskDao: TaskDao, repoService: RepoService);
    createTask(dto: CreateTaskDto): Promise<import("./task.entity").TaskEntity>;
    findTask(dto: FindTaskByIdDto): Promise<import("./task.entity").TaskEntity>;
    findTasks(dto: FindTasksDto): Promise<[import("./task.entity").TaskEntity[], number]>;
}
