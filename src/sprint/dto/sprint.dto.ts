import { IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/common.dto';

export class SprintDto extends BaseDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDate()
  startAt: Date;

  @ApiProperty()
  @IsDate()
  endAt: Date;
}

export class ResSprintDto {
  @ApiProperty()
  'id': number;

  @ApiProperty()
  'createdAt': Date;

  @ApiProperty()
  'updatedAt': Date;

  @ApiProperty()
  'userId': number;

  @ApiProperty()
  'repoId': number;

  @ApiProperty()
  'title': string;

  @ApiProperty()
  'description': string;

  @ApiProperty()
  'startAt': Date;

  @ApiProperty()
  'endAt': Date;

  @ApiProperty()
  'repoName': string;

  @ApiProperty()
  'repoHtmlUrl': string;

  @ApiProperty()
  'repoOwnerAvatarUrl': string;

  @ApiProperty()
  'repoSynchronizedAt': Date;

  // @ApiProperty()
  // 'openedCount': number;

  // @ApiProperty()
  // 'closedCount': number;
}
