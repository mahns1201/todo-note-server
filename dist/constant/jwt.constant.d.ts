export type jwtPayloadT = {
    id: number;
    email: string;
    username: string;
};
export type jwtUserT = {
    id: number;
    email: string;
    username: string;
    iat: Date;
    exp: Date;
};
export declare const jwtConstants: {
    secret: string;
};
