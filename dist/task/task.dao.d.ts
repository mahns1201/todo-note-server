import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskDao {
    private taskRepository;
    constructor(taskRepository: Repository<TaskEntity>);
    create(dto: CreateTaskDto): Promise<TaskEntity>;
    findById(id: number): Promise<TaskEntity>;
}
