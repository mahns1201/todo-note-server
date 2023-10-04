import { IsNotEmpty, IsString } from 'class-validator';
import { TaskEntity } from 'src/task/entity/task.entity';
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

  @ManyToOne(() => TaskEntity, (task) => task.id)
  task: TaskEntity;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  type: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  path: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  url: string;
}
