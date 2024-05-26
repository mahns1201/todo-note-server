import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResUserTokenDto } from 'src/user/dto/user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetGithubTokenByCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class ResGetGithubTokenDto extends ResDto {
  @ApiProperty({ description: '로그인 유저' })
  item: ResUserTokenDto;
}
