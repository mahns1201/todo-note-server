import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeDto } from 'src/common/common.dto';

export class RepoDto extends BaseTimeDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  repoName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  language: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  defaultBranch: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  isPrivate: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  htmlUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  synchronizedAt: string;
}
