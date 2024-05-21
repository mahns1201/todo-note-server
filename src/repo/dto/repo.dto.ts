import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/common.dto';
import { UserEntity } from 'src/user/user.entity';

export class RepoDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
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
  isPrivate: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  isFork: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  htmlUrl: string;

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
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  synchronizedAt: Date;
}
