import { NestFactory } from '@nestjs/core';
import { Logger, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as path from 'path';
import * as fs from 'fs';
import helmet from 'helmet';

dayjs.extend(utc);

async function bootstrap() {
  const keyPemPath = path.join(__dirname, '../../../.cert/localhost-key.pem');
  const pemPath = path.join(__dirname, '../../../.cert/localhost.pem');
  const areCertsExist = fs.existsSync(keyPemPath);

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.APP_ENV_NAME === 'prod'
        ? ['log', 'error', 'warn']
        : ['log', 'error', 'warn', 'debug', 'verbose'],
    ...(areCertsExist && {
      httpsOptions: {
        key: fs.readFileSync(keyPemPath),
        cert: fs.readFileSync(pemPath),
      },
    }),
  });

  app.use(helmet());

  const allowPath: (string | RegExp)[] = [
    '/api/admin/auth',
    /^\/api\/doc(\/.*)?$/,
  ];

  app.use((req, res, next) => {
    if (
      allowPath.some((path) =>
        typeof path === 'string' ? req.path === path : path.test(req.path),
      ) ||
      req.method === 'OPTIONS'
    ) {
      return next();
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const logger = new Logger('Bootstrap Admin API');

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
  });
  process.on('uncaughtException', (reason) => {
    logger.error('Uncaught Exception:', reason);
  });

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway Documentation')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'basic',
      },
      'accessToken',
    )
    .addSecurityRequirements('accessToken')
    .setVersion('1.0')
    .build();

  const options: SwaggerCustomOptions = {
    swaggerUiEnabled: process.env.APP_ENV_NAME !== 'prod',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document, options);

  const port = Number(process.env.ADMIN_API_PORT ?? 3009);

  logger.log(`Starting the admin api app at ${port}`);
  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
