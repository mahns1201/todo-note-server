import { HttpStatus } from '@nestjs/common';
export declare class BaseTimeDto {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class BaseResponseDto {
    httpStatus: HttpStatus;
    message: string;
}
export declare class ErrorResponseDto extends BaseResponseDto {
    error: string;
}
export declare class PagingRequestDto {
    page: number;
    limit: number;
}
export declare class PagingResponseDto extends BaseResponseDto {
    currentPage: number;
    limit: number;
    totalCount: number;
}
export interface ServiceResultDto<T> {
    items?: T;
    item?: T;
}
export interface ServicePagingResultDto<T> {
    items?: T;
    totalCount: number;
}
export declare class SwaggerResponseDto<T> {
    httpStatus: HttpStatus;
    message: string;
    items?: T[];
    item?: T;
}
