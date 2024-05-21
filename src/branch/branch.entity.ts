import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { RepoEntity } from '../repo/repo.entity';

@Entity({ name: 'branch' })
export class BranchEntity extends BaseEntity {
  @ManyToOne(() => RepoEntity, (repo) => repo.branches)
  repo: RepoEntity;

  @Column()
  @IsNotEmpty()
  repoId: number;

  @Column()
  @IsNotEmpty()
  branchName: string;
}
