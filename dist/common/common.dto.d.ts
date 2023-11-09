import { HttpStatus } from '@nestjs/common';
export declare class SwaggerResponseDto<T> {
    httpStatus: HttpStatus;
    message: string;
    items?: T[];
    item?: T;
}
export interface ServiceResultDto<T> {
    items?: T;
    item?: T;
}
