import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
// import { ExceptionsLoggerFilter } from './utils/exceiptionLogger.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  // const { httpAdapter } = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter))

  app.use(cookieParser());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
