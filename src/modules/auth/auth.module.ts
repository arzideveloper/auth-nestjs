import { RoutesService } from './../routes/routes.service';
import { RoutesModule } from './../routes/routes.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    RoutesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RoutesService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
