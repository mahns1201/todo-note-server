import { RepoDto } from './repo.dto';
import { PickType } from '@nestjs/swagger';

export class FindRepoByIdDto extends PickType(RepoDto, [
  'id',
  'user',
] as const) {}
