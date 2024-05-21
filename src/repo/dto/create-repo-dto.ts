import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepoDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  repoName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  defaultBranch: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  htmlUrl: string;
}
