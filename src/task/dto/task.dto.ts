import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  user: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  repo: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  content: string;
}
