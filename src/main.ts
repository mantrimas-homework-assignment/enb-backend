import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://enb-search-app-front-e55cc9352a61.herokuapp.com/',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
