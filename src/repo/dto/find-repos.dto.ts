import { ApiProperty } from '@nestjs/swagger';
import { PagingReqDto } from 'src/common/common.dto';
import { ResDto } from 'src/common/dto/res.dto';
import { ResRepoDto } from './repo.dto';

export class FindReposDto extends PagingReqDto {
  userId: number;
}

export class ResFindReposDto extends ResDto {
  @ApiProperty({ description: '조회된 레포지토리 리스트' })
  items: ResRepoDto[];
}
