import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Callback, Context, Handler } from 'aws-lambda';


// Trocamos o 'import' pelo 'require' para evitar conflitos de compilação na AWS
const serverlessExpress = require('@vendia/serverless-express');

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove campos extras que não estão no DTO
    forbidNonWhitelisted: true, // Dá erro se o usuário mandar campos inventados
  }));


  const config = new DocumentBuilder()
    .setTitle('API - Lista de Compras')
    .setDescription('Documentação do backend Serverless')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // 👆 FIM DA CONFIGURAÇÃO 👆

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};