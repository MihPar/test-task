import { NestFactory } from '@nestjs/core';
import { AuthModule } from './wrapper.ts/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3000);
}
bootstrap();
