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
declare const ResRepoDto_base: import("@nestjs/common").Type<Pick<RepoDto, "description" | "id" | "createdAt" | "updatedAt" | "userId" | "repoName" | "defaultBranch" | "htmlUrl" | "isPrivate" | "isFork" | "imageUrl" | "language" | "ownerAvatarUrl" | "synchronizedAt">>;
export declare class ResRepoDto extends ResRepoDto_base {
}
export {};
