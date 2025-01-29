import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: 'microservice1_queue',
        queueOptions: { durable: false },
      },
    },
  );
  await app.listen();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
