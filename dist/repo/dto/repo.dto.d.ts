import { BaseDto } from 'src/common/common.dto';
import { UserEntity } from 'src/user/user.entity';
export declare class RepoDto extends BaseDto {
    id: number;
    user: UserEntity;
    userId: number;
    repoName: string;
    defaultBranch: string;
    isPrivate: boolean;
    isFork: boolean;
    htmlUrl: string;
    language: string;
    imageUrl: string;
    description: string;
    ownerAvatarUrl: string;
    synchronizedAt: Date;
}
export declare class ResRepoDto {
    'id': number;
    'createdAt': Date;
    'updatedAt': Date;
    'userId': number;
    'repoName': number;
    'defaultBranch': string;
    'htmlUrl': string;
    'isPrivate': boolean;
    'isFork': boolean;
    'imageUrl': string;
    'description': string;
    'language': string;
    'ownerAvatarUrl': string;
    'synchronizedAt': Date;
}
