import { ApiProperty } from '@nestjs/swagger';
import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';
import { IsOptional } from 'class-validator';

export class FindTasksByRepoIdDto extends PagingReqDto {
  userId: number;
  repoId: number;
  sprintId?: number;
}

export class FindTaskByRepoIdQueryDto extends PagingReqDto {
  @ApiProperty({ required: false })
  @IsOptional()
  sprintId?: number;
}
export class ResFindTasksDto extends ResDto {
  @ApiProperty({ description: '조회된 태스크 목록' })
  items: ResTaskDto[];
}
