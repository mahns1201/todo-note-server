import { UserDto } from './user.dto';
import { PickType } from '@nestjs/swagger';

export class FindUserByIdDto extends PickType(UserDto, ['id'] as const) {}
