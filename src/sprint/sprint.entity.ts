import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { RepoEntity } from 'src/repo/repo.entity';

@Entity({ name: 'sprint' })
export class SprintEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.sprints)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  userId: number;

  @ManyToOne(() => RepoEntity, (user) => user.sprints)
  repo: RepoEntity;

  @Column()
  @IsNotEmpty()
  repoId: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  startAt: Date;

  @Column({ nullable: true })
  endAt: Date;
}
