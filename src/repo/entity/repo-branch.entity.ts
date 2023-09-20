import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { RepoEntity } from './repo.entity';

@Entity({ name: 'repo-branch' })
export class RepoBranchEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RepoEntity, (repo) => repo.id)
  repo: RepoEntity;

  @Column()
  @IsNotEmpty()
  branchName: string;
}
