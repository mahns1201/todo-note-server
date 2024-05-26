import { HttpStatus } from '@nestjs/common';
export declare class BaseDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isDeleted: boolean;
}
export declare class TokenDto {
    accessToken: string;
    githubToken: string;
}
export declare class PagingReqDto {
    page: number;
    pageSize: number;
    orderBy: string;
    sortBy: string;
}
export declare class CommonResDto {
    statusCode: HttpStatus;
    message: string;
}
export declare class ResDto<T> extends CommonResDto {
    statusCode: HttpStatus;
    message: string;
    item: T;
}
export declare class ListResDto<T> extends CommonResDto {
    statusCode: HttpStatus;
    message: string;
    items: T[];
}
