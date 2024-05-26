import { HttpStatus } from '@nestjs/common';
export declare class ResDto {
    item?: any;
    items?: any[];
    statusCode: HttpStatus;
    message: string;
}
