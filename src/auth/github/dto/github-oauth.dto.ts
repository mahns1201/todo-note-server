import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entity/user.entity';

export class GithubOauthDto {
  @IsNotEmpty()
  @ApiProperty()
  user: UserEntity;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  accessToken: string;
}
