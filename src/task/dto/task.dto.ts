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

export class ResTaskDto extends PickType(TaskDto, [
  'id',
  'createdAt',
  'updatedAt',
  'userId',
  'repoId',
  'title',
  'content',
  'isGithubIssue',
] as const) {}
