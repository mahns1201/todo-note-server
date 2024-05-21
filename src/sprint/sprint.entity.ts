import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'sprint' })
export class SprintEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.sprints)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  userId: number;

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
