import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseDto } from 'src/common/common.dto';

export class TaskDto extends BaseDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  repoId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsBoolean()
  isGithubIssue: boolean;
}

export class ResTaskDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  repoId: number;
  title: string;
  content: string;
  isGithubIssue: boolean;
  repoName: string;
  repoHtmlUrl: string;
  repoOwnerAvatarUrl: string;
  repoSynchronizedAt: Date;
}
