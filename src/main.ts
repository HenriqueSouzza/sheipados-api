import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://sheipados-dev.com',
      'https://productive-annabel-henriquedev-22d31d9f.koyeb.app/',
    ],
    methods: ["GET", "POST", "PUT"]
  })

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get('PORT') || 3000);
}

bootstrap();
