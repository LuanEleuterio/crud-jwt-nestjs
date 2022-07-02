import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudModule } from './crud.module';

async function bootstrap() {
  const app = await NestFactory.create(CrudModule, {cors: true});

  const config = new  DocumentBuilder()
    .setTitle('CRUD API')
    .setDescription('The cars API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document)

  await app.listen(3001);
}
bootstrap();
