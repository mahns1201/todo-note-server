import { TaskService } from './task.service';
import { CreateTaskDto, ResCreateTaskDto } from './dto/create-task.dto';
import { ResFindTaskDto } from './dto/find-task.dto';
import { ResFindTasksDto } from './dto/find-tasks.dto';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(req: any, body: CreateTaskDto): Promise<ResCreateTaskDto>;
    getTaskList(req: any, query: any): Promise<ResFindTasksDto>;
    findTask(req: any, param: any): Promise<ResFindTaskDto>;
}
