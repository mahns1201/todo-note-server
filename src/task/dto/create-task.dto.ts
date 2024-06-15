import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';

export class CreateTaskDto {
  userId: number;

  repoId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sprintId: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsOptional()
  isGithubIssue: boolean;
}

export class ResCreateTaskDto extends ResDto {
  @ApiProperty({ description: '생성된 태스크' })
  item: ResTaskDto;
}
