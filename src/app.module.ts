import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigModule } from './modules/appconfig/appconfig.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongoModule } from './modules/database/mongo.module';
import { ApiModule } from './api/api.module';
import { UsersModule } from './modules/users/users.module';
import { RoutesModule } from './modules/routes/routes.module';
import { roles } from "./app.roles";
import { AccessControlModule } from 'nest-access-control';
@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    MongoModule,
    ApiModule,
    UsersModule,
    ConfigModule,
    RoutesModule,
    AccessControlModule.forRoles(roles)
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  constructor() {}
}
