import { RoutesService } from './modules/routes/routes.service';
import { AppConfigService } from './modules/appconfig/appconfig.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // app.use(csurf({ cookie: true }));
  app.use(compression());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.get('port'));

  //Código que sincroniza las rutas con la base de datos
  const server = app.getHttpServer();
  const adminRouteService = app.get<RoutesService>(RoutesService);
  adminRouteService.deleteRoutes();
  server._events.request._router.stack.forEach(function(r) {
    if (r.route && r.route.path) {
      const methods = [];
      if (r.route.methods.get) {
        methods.push('GET');
      }
      if (r.route.methods.post) {
        methods.push('POST');
      }
      if (r.route.methods.put) {
        methods.push('PUT');
      }
      if (r.route.methods.delete) {
        methods.push('DELETE');
      }
      const itemRoute = {
        path: r.route.path,
        methods,
        roles: [],
      };
      adminRouteService.insertRoutes(itemRoute);
    }
  });
}
bootstrap();
