import { NestFactory } from '@nestjs/core';
import { CrudModule } from './crud.module';

async function bootstrap() {
  const app = await NestFactory.create(CrudModule);
  await app.listen(3001);
}
bootstrap();
