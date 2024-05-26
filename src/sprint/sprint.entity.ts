import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
// import { TaskEntity } from 'src/task/task.entity';

@Entity({ name: 'sprint' })
export class SprintEntity extends BaseEntity {
  // @OneToMany(() => TaskEntity, (task) => task.sprint)
  // tasks: TaskEntity[];

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
