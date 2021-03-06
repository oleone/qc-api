import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  /* Swagger configuration */
  const config = new DocumentBuilder()
    .setTitle('NodeJS API')
    .setDescription('QC NodeJS API CRUD using NestJS Framework')
    .setVersion('1.0')
    .addTag('crud')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
