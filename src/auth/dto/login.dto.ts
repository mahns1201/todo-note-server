import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResUserTokenDto } from 'src/user/dto/user.dto';

export class ResLoginDto extends ResDto {
  @ApiProperty({ description: '로그인 유저' })
  item: ResUserTokenDto;
}
