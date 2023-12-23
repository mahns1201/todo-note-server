import { PagingResponseDto } from 'src/common/common.dto';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { RepoDto } from './repo.dto';

export class OutputReposDto extends OmitType(RepoDto, ['user'] as const) {}

export class InputFindRepoDto extends PickType(RepoDto, ['id'] as const) {}

export class InputFindAllReposDto extends PickType(UserDto, ['id'] as const) {}
export class InputFindReposDto extends PickType(UserDto, ['id'] as const) {
  page: number;
  limit: number;
}
export class OutputFindReposDto extends PagingResponseDto {
  @ApiProperty({ isArray: true })
  items: OutputReposDto;
}
