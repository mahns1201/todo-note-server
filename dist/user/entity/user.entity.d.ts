import { BaseEntity } from 'src/common/common.entity';
export declare class UserEntity extends BaseEntity {
    id: number;
    email: string;
    githubId: string;
    password: string;
    avatarUrl: string;
    isGithub: boolean;
}
