import { RepoDto } from './repo.dto';
import { PickType } from '@nestjs/swagger';

export class CreateRepoDto extends PickType(RepoDto, [
  'user',
  'repoName',
  'defaultBranch',
  'htmlUrl',
] as const) {}
