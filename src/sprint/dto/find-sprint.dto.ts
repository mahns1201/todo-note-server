import { PagingResponseDto } from 'src/common/common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { SprintEntity } from '../entity/sprint.entity';

export class InputFindSprintsDto extends PickType(UserDto, ['id'] as const) {
  page: number;
  limit: number;
}

export class OutputFindSprintsDto extends PagingResponseDto {
  @ApiProperty({ isArray: true })
  items: SprintEntity[];
}
