import { BaseTimeDto } from 'src/common/common.dto';
export declare class UserDto extends BaseTimeDto {
    id: number;
    email: string;
    githubId: string;
    password: string;
    avatarUrl: string;
    isGithub: boolean;
    githubAccessToken: string;
}
