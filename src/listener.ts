import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('api')
  app.enableCors()
  await app.listen(8081).then(() => {
    console.log('App is listening on port 8081');
  });
}
bootstrap();
