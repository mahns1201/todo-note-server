import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
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
