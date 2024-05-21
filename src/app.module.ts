import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NextFunction, Request, Response } from 'express';
import { AuthModule } from './auth/auth.module';
import { RepoModule } from './repo/repo.module';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
      );
    });

    next();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    RepoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
