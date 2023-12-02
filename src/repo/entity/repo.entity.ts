import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity({ name: 'repo' })
export class RepoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  repoName: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  defaultBranch: string;

  @Column({ nullable: true })
  isPrivate: boolean;

  @Column({ nullable: true })
  htmlUrl: string;

  @Column({ nullable: true })
  description: string;
}
