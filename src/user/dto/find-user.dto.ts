import { ResUserDto, UserDto } from './user.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';

export class FindUserByIdDto extends PickType(UserDto, ['id'] as const) {}

export class FindUserByEmailDto extends PickType(UserDto, ['email'] as const) {}

export class ResFindUserDto extends ResDto {
  @ApiProperty({ description: '조회된 유저' })
  item: ResUserDto;
}
