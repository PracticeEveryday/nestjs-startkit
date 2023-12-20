import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './libs/env/env.service';
import { EnvEnum } from './libs/env/env.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get(EnvService);
  const PORT = +envService.get<EnvEnum>(EnvEnum.PORT) || 3000;

  await app.listen(3000);
}
bootstrap();
