import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResRepoDto } from './repo.dto';

export class CreateRepoDto {
  @IsNumber()
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

export class ResCreateRepoDto extends ResDto {
  @ApiProperty({ description: '생성된 레포지토리' })
  item: ResRepoDto;
}
