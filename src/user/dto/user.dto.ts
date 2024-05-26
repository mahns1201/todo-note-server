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
import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseDto } from 'src/common/common.dto';

export class UserDto extends BaseDto {
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
  githubToken: string;
}

export class ResUserDto extends PickType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
  'email',
  'githubId',
  'avatarUrl',
  'isGithub',
] as const) {}

export class ResUserTokenDto extends ResUserDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @IsString()
  accessToken: string;
}
