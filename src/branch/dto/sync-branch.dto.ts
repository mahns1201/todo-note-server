import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';

export class SyncBranchDto {
  userId: number;
  repoId: number;
}

export class ResSyncBranchDto extends ResDto {
  @ApiProperty({ description: '브랜치 동기화 목록' })
  items: string[];
}
