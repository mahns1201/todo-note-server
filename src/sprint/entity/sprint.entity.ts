import { BaseEntity } from 'src/common/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoEntity } from 'src/repo/entity/repo.entity';

@Entity({ name: 'sprint' })
export class SprintEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => RepoEntity, (repo) => repo.id)
  @JoinColumn({ name: 'repoId' })
  repo: RepoEntity;

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
