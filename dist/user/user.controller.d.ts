import { UserService } from './user.service';
import { InputCreateUserDto, OutputCreateUserDto } from './dto/create-user.dto';
import { InputFindUserDto, OutputFindUserDto } from './dto/find-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(input: InputCreateUserDto): Promise<OutputCreateUserDto>;
    findOne(input: InputFindUserDto): Promise<OutputFindUserDto>;
}
