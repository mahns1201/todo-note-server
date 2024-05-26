import { UserService } from './user.service';
import { CreateUserDto, ResCreateUserDto } from './dto/create-user.dto';
import { ResFindUserDto } from './dto/find-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(body: CreateUserDto): Promise<ResCreateUserDto>;
    findUser(req: any): Promise<ResFindUserDto>;
}
