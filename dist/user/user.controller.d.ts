import { UserService } from './user.service';
import { InputCreateUserDto, OutputCreateUserDto } from './dto/create-user.dto';
import { OutputFindUserDto } from './dto/find-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(input: InputCreateUserDto): Promise<OutputCreateUserDto>;
    findOne(request: any): Promise<OutputFindUserDto>;
}
