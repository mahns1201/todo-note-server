import { HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { jwtUserT } from 'src/constant/jwt.constant';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(request: any, body: any): Promise<{
        httpStatus: HttpStatus;
        message: string;
        item: import("./entity/task.entity").TaskEntity;
    }>;
    findTaskById(user: jwtUserT, param: any): Promise<{
        item: import("./entity/task.entity").TaskEntity;
        httpStatus: HttpStatus;
        message: string;
    }>;
}
