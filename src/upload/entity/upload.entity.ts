import { IsNotEmpty, IsString } from 'class-validator';
import { TaskEntity } from 'src/task/entity/task.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'upload' })
export class UploadEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => TaskEntity, (task) => task.id)
  task: TaskEntity;

  @Column()
  @IsNotEmpty()
  @IsString()
  originalname: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  encoding: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  url: string;
}
