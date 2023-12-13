import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://tftfcwek:nqjl28IIWF3uH1TIIeJVfX5_tseCRrnM@whale.rmq.cloudamqp.com/tftfcwek'],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      }
    },
  );
  await app.listen().then(() => {
    console.log("Microservice is listening!")
  });
}
bootstrap();
