import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  IsUrl,
  IsBoolean,
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEmpty()
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
}
