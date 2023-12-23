import { ApiProperty, OmitType } from '@nestjs/swagger';
import { SprintDto } from './sprint.dto';
import { BaseResponseDto } from 'src/common/common.dto';
import { SprintEntity } from '../entity/sprint.entity';

export class InputCreateSprintDto extends OmitType(SprintDto, [
  'id',
  'user',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
export class OutputCreateSprintDto extends BaseResponseDto {
  @ApiProperty()
  item: SprintEntity;
}
