import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  IsUrl,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeDto } from 'src/common/common.dto';

export class UserDto extends BaseTimeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  githubId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  avatarUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isGithub: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @IsString()
  githubAccessToken: string;
}
