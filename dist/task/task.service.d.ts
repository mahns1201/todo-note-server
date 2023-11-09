import { Repository } from 'typeorm';
import { TaskEntity } from './entity/task.entity';
import { UploadService } from 'src/upload/upload.service';
export declare class TaskService {
    private taskRepository;
    private uploadService;
    constructor(taskRepository: Repository<TaskEntity>, uploadService: UploadService);
    createTask(input: any): Promise<{
        item: TaskEntity[];
    }>;
    findTaskById(input: any): Promise<{
        items: {
            task: TaskEntity;
            upload: any[];
        };
    }>;
}
