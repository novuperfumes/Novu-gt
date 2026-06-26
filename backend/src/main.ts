import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false, // Pino handles request logging via middleware
    }),
  );

  // Set pino-logger as NestJS system logger
  app.useLogger(app.get(Logger));

  // Register cookie support for Fastify
  await app.register(fastifyCookie, {
    secret: process.env.JWT_SECRET ?? 'cookie_secret_fallback',
  });

  // Enable CORS
  app.enableCors({
    origin: true, // Configured for dev; restrict in production
    credentials: true,
  });

  // Global validation pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
