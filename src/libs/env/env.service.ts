import { Injectable } from '@nestjs/common';
import { EnvEnum } from './env.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get<T>(key: EnvEnum, defaultValue?: T): T {
    return this.configService.get(EnvEnum[key]) || defaultValue;
  }
}
