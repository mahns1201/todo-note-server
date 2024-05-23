import { PickType } from '@nestjs/swagger';
import { RepoDto } from './repo.dto';

export class SyncRepoDto extends PickType(RepoDto, ['userId'] as const) {}
