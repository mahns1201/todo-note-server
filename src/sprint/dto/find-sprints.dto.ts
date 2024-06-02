import { ApiProperty } from '@nestjs/swagger';
import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResSprintDto } from './sprint.dto';

export class FindSprintsDto extends PagingReqDto {
  userId: number;
}

export class ResFindSprintsDto extends ResDto {
  @ApiProperty({ description: '조회된 스프린트 목록' })
  items: ResSprintDto[];
}
