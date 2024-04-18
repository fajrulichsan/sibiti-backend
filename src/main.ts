import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://sibiti-frontend.vercel.app', // Replace with allowed origin(s)
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    },
  });

  await app.listen(3000);

  
}
bootstrap();
