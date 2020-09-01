import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../appconfig/appconfig.service';
import { AppConfigModule } from '../appconfig/appconfig.module';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [AppConfigModule],
    inject: [AppConfigService],
    useFactory: async (config: AppConfigService) => ({
      uri: config.get('MONGODB_URI'),
      useFindAndModify: false,
      useNewUrlParser: true,
    }),
  }),
];
