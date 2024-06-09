import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResRepoDto } from './repo.dto';

export class CreateRepoDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  repoName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  language: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  defaultBranch: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ownerAvatarUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  htmlUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPrivate: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFork: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  synchronizedAt: Date;
}

export class ResCreateRepoDto extends ResDto {
  @ApiProperty({ description: '생성된 레포지토리' })
  item: ResRepoDto;
}
