import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  githubId: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatarUrl: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isGithub: boolean;

  @IsOptional()
  @IsBoolean()
  @IsString()
  githubAccessToken: string;
}
