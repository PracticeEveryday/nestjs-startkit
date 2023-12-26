import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './libs/env/env.service';
import { EnvEnum } from './libs/env/env.enum';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { setupSwagger } from './libs/swagger/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get(EnvService);
  const PORT = +envService.get<EnvEnum>(EnvEnum.PORT) || 3000;

  setupSwagger(app);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(PORT);
}
bootstrap();
