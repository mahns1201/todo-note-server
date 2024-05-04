import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { SprintEntity } from 'src/sprint/entity/sprint.entity';

@Entity({ name: 'task' })
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  // 모든 task(메모, 이슈)는 repo 아래에 존재한다.
  @ManyToOne(() => RepoEntity, (repo) => repo.id)
  repo: RepoEntity;

  @ManyToOne(() => SprintEntity, (sprint) => sprint.id, { nullable: true })
  sprint: SprintEntity;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsOptional()
  @IsString()
  content: string;

  // 레포지토리 아래에 메모를 남기더라도 이슈 등록을 하지 않았을 수 있다. -> isIssue: false
  @Column({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isIssue: boolean;
}
