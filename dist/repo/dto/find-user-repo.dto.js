"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFindUserReposDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../../user/dto/user.dto");
class InputFindUserReposDto extends (0, swagger_1.PickType)(user_dto_1.UserDto, [
    'email',
]) {
}
exports.InputFindUserReposDto = InputFindUserReposDto;
//# sourceMappingURL=find-user-repo.dto.js.map