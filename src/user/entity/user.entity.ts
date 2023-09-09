import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  avatarUrl: string;

  @Column({ default: false })
  @IsOptional()
  isGithub: boolean;
}
