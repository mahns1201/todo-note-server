"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFindTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_dto_1 = require("./task.dto");
class InputFindTaskDto extends (0, swagger_1.PickType)(task_dto_1.TaskDto, ['id']) {
}
exports.InputFindTaskDto = InputFindTaskDto;
//# sourceMappingURL=find-task.dto.js.map