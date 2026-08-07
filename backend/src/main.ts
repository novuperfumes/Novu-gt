import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import helmet from '@fastify/helmet';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false, // Pino handles request logging via middleware
    }),
  );

  // Set pino-logger as NestJS system logger
  app.useLogger(app.get(Logger));

  // Security check for production JWT secret
  if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('fallback') || process.env.JWT_SECRET.includes('change_in_production'))) {
    console.error('FATAL SECURITY ERROR: JWT_SECRET must be explicitly set to a strong secret in production mode.');
    process.exit(1);
  }

  // Ensure uploads directory exists
  const uploadsDir = join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Register cookie support for Fastify
  await app.register(fastifyCookie, {
    secret: process.env.JWT_SECRET ?? 'cookie_secret_fallback',
  });

  // Register multipart support for file uploads
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  });

  // Register static file serving for uploads directory
  await app.register(fastifyStatic, {
    root: uploadsDir,
    prefix: '/uploads/',
  });

  // Register Helmet for Security Headers
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'res.cloudinary.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    crossOriginResourcePolicy: false, // For serving images across origins if needed
  });

  // Register CSRF Protection
  await app.register(fastifyCsrfProtection, { 
    cookieOpts: { 
      signed: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    } 
  });

  // Add global CSRF hook
  const fastifyInstance = app.getHttpAdapter().getInstance() as any;
  fastifyInstance.addHook('preValidation', async (req: any, reply: any) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      // Routes excluded from CSRF:
      // - Auth routes (no session yet when logging in)
      // - Uploads (already excluded from CSRF in original code)
      // - API routes protected by JWT+RolesGuard (banners, campanias, promo-codes, etc.)
      //   These are safe because the JWT cookie already prevents cross-site attacks.
      const excludedPrefixes = [
        '/auth/login',
        '/auth/register', 
        '/uploads/',
        '/banners',
        '/campanias',
        '/promo-codes',
        '/perfumes',
        '/inventory',
        '/decants',
        '/branches',
        '/gift-cards',
        '/orders',
        '/users',
        '/reviews',
        '/whatsapp-orders',
        '/sales-reports',
      ];
      if (!excludedPrefixes.some(prefix => req.url.startsWith(prefix))) {
        await new Promise((resolve, reject) => {
          fastifyInstance.csrfProtection(req, reply, (err: any) => {
            if (err) reject(err);
            else resolve(true);
          });
        });
      }
    }
  });

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173', // Restrict in production
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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
