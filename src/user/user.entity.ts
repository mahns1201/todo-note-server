import { Column, Entity } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/common.entity';

// nullable default: false

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  githubId: string;

  @Column({ nullable: true })
  @IsOptional()
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  avatarUrl: string;

  @Column({ default: false })
  @IsOptional()
  isGithub: boolean;

  @Column({ nullable: true })
  @IsOptional()
  githubAccessToken: string;
}
