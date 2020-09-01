import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject('RoutesService') private readonly routeService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const isAuthorized = this.routeService.validateRoute(
      request.route.path,
      request.method,
      request.user.role,
    );
    return isAuthorized;
  }
}
