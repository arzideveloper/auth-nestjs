import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor(private readonly configService: ConfigService) {}

  get(key: string): string {
    return this.configService.get(key);
  }
}
