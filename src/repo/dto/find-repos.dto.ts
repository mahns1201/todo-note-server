import { PagingReqDto } from 'src/common/common.dto';

export class FindReposDto extends PagingReqDto {
  userId: number;
}
