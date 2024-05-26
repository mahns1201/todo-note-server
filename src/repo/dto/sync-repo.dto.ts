import { ApiProperty, PickType } from '@nestjs/swagger';
import { RepoDto } from './repo.dto';
import { ResDto } from 'src/common/dto/res.dto';

export class SyncRepoDto extends PickType(RepoDto, ['userId'] as const) {}

export class ResSyncRepoDto extends ResDto {
  @ApiProperty({ description: '레포지토리 동기화 목록' })
  items: string[];
}
