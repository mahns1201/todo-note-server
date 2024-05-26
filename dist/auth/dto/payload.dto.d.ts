import { ResDto } from 'src/common/dto/res.dto';
declare class PayLoad {
    id: number;
    email: string;
    iat: number;
    exp: number;
}
export declare class ResPayloadDto extends ResDto {
    item: PayLoad;
}
export {};
