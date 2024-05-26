import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class SprintEntity extends BaseEntity {
    user: UserEntity;
    userId: number;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
}
