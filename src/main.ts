import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './filter/GlobalExceptionFilter';
import * as fs from "fs/promises";
import { HTTPS_CERT, HTTPS_KEY, SERVER_PORT } from './constants';

async function bootstrap() {
  const httpsOptions = {
    key: await fs.readFile(HTTPS_KEY),
    cert: await fs.readFile(HTTPS_CERT)
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(SERVER_PORT);
}
bootstrap();
