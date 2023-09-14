import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { readFileSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cloudinary from 'cloudinary';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from '@exception/global-exception';

const PORT = process.env.PORT || 3800;

async function bootstrap() {
  const httpsOptions = {
    cert: readFileSync(join(__dirname, '../cert', 'cert.pem')),
    key: readFileSync(join(__dirname, '../cert', 'key.pem')),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
    cors: true,
  });

  //Global Api Prefix
  app.setGlobalPrefix('api/v1');

  // Apply the ValidationPipe globally with proper options
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Apply the GlobalExceptionFilter
  app.useGlobalFilters(new GlobalExceptionFilter());

  //Body Parser
  app.useBodyParser('json', { limit: '10mb' });

  cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  await app.listen(PORT, () =>
    console.log(`Server is up and running on https://localhost:${PORT}`),
  );
}
bootstrap();
