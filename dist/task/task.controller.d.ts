import { HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(input: any): Promise<{
        item: import("./entity/task.entity").TaskEntity[];
        httpStatus: HttpStatus;
        message: string;
    }>;
    findTaskById(input: any): Promise<{
        items: {
            task: import("./entity/task.entity").TaskEntity;
            upload: any[];
        };
        httpStatus: HttpStatus;
        message: string;
    }>;
}
