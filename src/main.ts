import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error'],
  });

  const config = new DocumentBuilder()
    .setTitle('Dev To Do Notes')
    .setDescription('Dev-To-Do-Notes API 문서')
    .setVersion('1.0')
    .addTag('dev-to-do-notes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
