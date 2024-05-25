import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/common.entity';
import { RepoEntity } from 'src/repo/repo.entity';
import { SprintEntity } from 'src/sprint/sprint.entity';
import { TaskEntity } from 'src/task/task.entity';
import { BranchEntity } from 'src/branch/branch.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @OneToMany(() => RepoEntity, (repo) => repo.user)
  repos: RepoEntity[];

  @OneToMany(() => BranchEntity, (branch) => branch.user)
  branches: BranchEntity[];

  @OneToMany(() => SprintEntity, (sprint) => sprint.user)
  sprints: SprintEntity[];

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  githubId: string;

  @Column({ nullable: true })
  @IsOptional()
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  avatarUrl: string;

  @Column({ default: false })
  @IsOptional()
  isGithub: boolean;

  @Column({ nullable: true })
  @IsOptional()
  githubToken: string;
}
