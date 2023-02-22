import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from '@vendia/serverless-express';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  return serverless({ app: expressApp });
}

export async function handler(event, context, callback) {
  console.log(event);
  server = server ?? (await bootstrap());
  return server(event, context, callback);
}
