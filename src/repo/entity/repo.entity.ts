import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity({ name: 'repo' })
export class RepoEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  repoName: string;

  @Column()
  defaultBranch: string;

  @Column()
  htmlUrl: string;

  @Column()
  isPrivate: boolean;

  @Column()
  isFork: boolean;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  ownerAvatarUrl: string;

  @Column({ nullable: true })
  synchronizedAt: Date;
}
