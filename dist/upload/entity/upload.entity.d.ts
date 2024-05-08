import { TaskEntity } from 'src/task/entity/task.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { BaseEntity } from 'typeorm';
export declare class UploadEntity extends BaseEntity {
    id: number;
    user: UserEntity;
    task: TaskEntity;
    originalname: string;
    encoding: string;
    mimetype: string;
    url: string;
}
