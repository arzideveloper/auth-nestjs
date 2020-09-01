import { RoutesService } from './../routes/routes.service';
import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly routeService: RoutesService,
  ) {}
  async use(req: Request, res: Response, next: () => void) {
    try {
      const authHeaders = req.headers.authorization;
      if (!authHeaders) {
        throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
      }
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, jwtConstants.secret);
      let user = await this.userService.getUserByUsername(decoded.username);
      req.user = user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
