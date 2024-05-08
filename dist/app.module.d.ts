import { MiddlewareConsumer, NestMiddleware, NestModule } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private logger;
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
