import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoEntity } from 'src/repo/entity/repo.entity';

@Entity({ name: 'project' })
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => RepoEntity, (repo) => repo.id)
  repo: RepoEntity;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsOptional()
  content: string;
}
