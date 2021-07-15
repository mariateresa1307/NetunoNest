import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogRequest } from './middleware/logRequest';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.setGlobalPrefix('api');
  app.use(LogRequest);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
