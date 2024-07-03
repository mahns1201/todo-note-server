import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ResDto } from 'src/common/dto/res.dto';

export class SyncSprintDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  repoId: number;
}

export class ResSyncSprintDto extends ResDto {
  @ApiProperty({ description: '스프린트 동기화 목록' })
  items: string[];
}
