import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from '@common/interceprot/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = app.get(ConfigService);
  const port = config.get<number>('APP_PORT');

  const configDocument = new DocumentBuilder()
    .setTitle('Chat Doc')
    .setDescription('The chat info')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup('swagger', app, document);


  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  await app.listen(port || 3000);
}
bootstrap();
