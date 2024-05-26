import { IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
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

export class ResSprintDto extends PickType(SprintDto, [
  'id',
  'createdAt',
  'updatedAt',
  'userId',
  'title',
  'description',
  'startAt',
  'endAt',
] as const) {}
