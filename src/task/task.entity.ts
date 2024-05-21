import { Column, Entity, ManyToOne } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/user/user.entity';
import { RepoEntity } from 'src/repo/repo.entity';
import { SprintEntity } from 'src/sprint/sprint.entity';
// import { RepoEntity } from 'src/repo/repo.entity';
// import { SprintEntity } from 'src/sprint/sprint.entity';

@Entity({ name: 'task' })
export class TaskEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  userId: number;

  @ManyToOne(() => RepoEntity, (repo) => repo.tasks)
  repo: RepoEntity;

  @Column()
  @IsNotEmpty()
  repoId: number;

  @ManyToOne(() => SprintEntity, (sprint) => sprint.tasks, { nullable: true })
  sprint: SprintEntity;

  @Column()
  @IsOptional()
  sprintId: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsOptional()
  @IsString()
  content: string;

  @Column({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isGithubIssue: boolean;
}
