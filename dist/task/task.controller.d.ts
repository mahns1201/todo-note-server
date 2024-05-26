import { TaskService } from './task.service';
import { CreateTaskDto, ResCreateTaskDto } from './dto/create-task.dto';
import { ResFindTaskDto } from './dto/find-task.dto';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(req: any, body: CreateTaskDto): Promise<ResCreateTaskDto>;
    findTask(req: any, param: any): Promise<ResFindTaskDto>;
}
