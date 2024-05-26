import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { BranchEntity } from 'src/branch/branch.entity';
import { TaskEntity } from 'src/task/task.entity';

@Entity({ name: 'repo' })
export class RepoEntity extends BaseEntity {
  @OneToMany(() => BranchEntity, (branch) => branch.repo)
  branches: BranchEntity[];

  @OneToMany(() => TaskEntity, (task) => task.repo)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.repos)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  userId: number;

  @Column()
  @IsNotEmpty()
  repoName: string;

  @Column()
  defaultBranch: string;

  @Column()
  htmlUrl: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isFork: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  ownerAvatarUrl: string;

  @Column({ nullable: true })
  synchronizedAt: Date;
}
