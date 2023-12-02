import { IsString, IsNumber, IsOptional } from 'class-validator';
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
}
