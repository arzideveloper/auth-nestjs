import { Module, Global } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteSchema } from './schemas/route.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Routes',
        schema: RouteSchema,
      },
    ]),
  ],
  providers: [RoutesService],
  exports: [RoutesService, MongooseModule],
})
export class RoutesModule {}
