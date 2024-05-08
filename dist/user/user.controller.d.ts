import { UserService } from './user.service';
import { OutputFindUserDto } from './dto/find-user.dto';
import { jwtUserT } from 'src/constant/jwt.constant';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findOne(jUser: jwtUserT): Promise<OutputFindUserDto>;
}
