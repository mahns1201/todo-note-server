import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { RepoEntity } from './repo.entity';

@Entity({ name: 'repo-branch' })
export class RepoBranchEntity extends BaseEntity {
  @ManyToOne(() => RepoEntity, (repo) => repo.id)
  repo: RepoEntity;

  @Column()
  @IsNotEmpty()
  branchName: string;
}
