import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
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
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  defaultBranch: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerAvatarUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  htmlUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPrivate: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isFork: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  synchronizedAt: Date;
}
