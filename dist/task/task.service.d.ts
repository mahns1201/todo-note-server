import { TaskDao } from './task.dao';
import { FindTaskByIdDto } from './dto/find-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskService {
    private readonly taskDao;
    constructor(taskDao: TaskDao);
    createTask(dto: CreateTaskDto): Promise<import("./task.entity").TaskEntity>;
    findTask(dto: FindTaskByIdDto): Promise<import("./task.entity").TaskEntity>;
}
