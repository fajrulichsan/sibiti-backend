import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://sibiti-frontend.netlify.app/'
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  });
  await app.listen(3000);
}
bootstrap();
