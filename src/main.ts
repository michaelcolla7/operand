import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const logger = WinstonModule.createLogger(winstonConfig);

  const config = new DocumentBuilder()
    .setTitle('API - Operand')
    .setDescription(
      'This API provides access to the functionalities of Operand, a data integration platform for companies. The Operand API allows developers to access essential capabilities to manage data, integrate systems, and automate business processes.<br /><br />**Available Endpoints:**<br /><br />- **/auth**: Authorization routes.<br /><br />- **/users**: Users management.<br /><br />For more informations about us, visit our home page: [Operand](https://operand.com.br/)',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.register(fastifyMultipart);

  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 Operand API is running on: ${await app.getUrl()}`);
}
bootstrap();
