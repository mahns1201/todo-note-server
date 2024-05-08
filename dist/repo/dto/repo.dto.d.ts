import { BaseTimeDto } from 'src/common/common.dto';
export declare class RepoDto extends BaseTimeDto {
    id: number;
    user: number;
    repoName: string;
    defaultBranch: string;
    isPrivate: boolean;
    isFork: boolean;
    htmlUrl: string;
    language: string;
    imageUrl: string;
    description: string;
    synchronizedAt: string;
}
