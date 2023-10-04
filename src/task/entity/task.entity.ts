import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { RepoBranchEntity } from 'src/repo/entity/repo-branch.entity';

@Entity({ name: 'task' })
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => RepoEntity, (repo) => repo.id)
  repo: RepoEntity;

  @ManyToOne(() => RepoBranchEntity, (repoBranch) => repoBranch.id)
  repoBranch: RepoBranchEntity;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsOptional()
  @IsString()
  content: string;
}
