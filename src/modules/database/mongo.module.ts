import { databaseProviders } from './providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class MongoModule {
  constructor() {}
}
