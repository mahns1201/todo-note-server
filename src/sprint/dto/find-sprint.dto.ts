import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResSprintProgressDto } from './sprint.dto';

export class FindSprintByIdDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class ResFindSprintDto extends ResDto {
  @ApiProperty({ description: '조회된 스프린트' })
  item: ResSprintProgressDto;
}
