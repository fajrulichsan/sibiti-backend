import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule , {cors : true});

  app.use(cors({
    origin: 'https://sibiti-frontend.netlify.app', // Ganti dengan URL Frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Izinkan penggunaan kredensial (misalnya, cookie)
  }));
  await app.listen(3000);
}
bootstrap();
