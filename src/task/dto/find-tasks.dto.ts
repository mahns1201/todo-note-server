import { ApiProperty } from '@nestjs/swagger';
import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';

export class FindTasksDto extends PagingReqDto {
  userId: number;
}

export class ResFindTasksDto extends ResDto {
  @ApiProperty({ description: '조회된 태스크 목록' })
  items: ResTaskDto[];
}
