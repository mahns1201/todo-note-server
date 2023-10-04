import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RepoDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  user: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  repoName: string;
}
