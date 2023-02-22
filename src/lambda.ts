import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from '@vendia/serverless-express';

console.log(serverless);

let server;

/**
 *
 * @returns ServerlessExpressApp
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverless({ app: expressApp });
}

/**
 *
 * @param event Handler
 * @param context Context
 * @param callback Callback
 * @returns any
 */
export async function handler(event, context, callback) {
  console.log(event);
  server = server ?? (await bootstrap());
  return server(event, context, callback);
}
