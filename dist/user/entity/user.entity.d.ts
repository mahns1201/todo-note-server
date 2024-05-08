import { BaseEntity } from 'src/common/common.entity';
export declare class UserEntity extends BaseEntity {
    email: string;
    githubId: string;
    password: string;
    avatarUrl: string;
    isGithub: boolean;
    githubAccessToken: string;
}
