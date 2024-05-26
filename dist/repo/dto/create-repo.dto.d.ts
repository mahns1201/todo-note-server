import { ResDto } from 'src/common/dto/res.dto';
import { ResRepoDto } from './repo.dto';
export declare class CreateRepoDto {
    userId: number;
    repoName: string;
    description: string;
    language: string;
    defaultBranch: string;
    ownerAvatarUrl: string;
    htmlUrl: string;
    isPrivate: boolean;
    isFork: boolean;
    synchronizedAt: Date;
}
export declare class ResCreateRepoDto extends ResDto {
    item: ResRepoDto;
}
