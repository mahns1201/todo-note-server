import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  repoId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  isGithubIssue: boolean;

  @ApiProperty()
  repoName: string;

  @ApiProperty()
  repoHtmlUrl: string;

  @ApiProperty()
  repoOwnerAvatarUrl: string;

  @ApiProperty()
  repoSynchronizedAt: Date;
}
