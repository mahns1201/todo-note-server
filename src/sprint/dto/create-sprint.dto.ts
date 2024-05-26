import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResSprintDto } from './sprint.dto';

export class CreateSprintDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  startAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  endAt: Date;
}

export class ResCreateSprintDto extends ResDto {
  @ApiProperty({ description: '조회된 스프린트' })
  item: ResSprintDto;
}
