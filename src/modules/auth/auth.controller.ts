import { RegisterDTO } from '../users/dto/register.dto';
import { LoginDTO } from '../users/dto/login.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Request,
  Res,
  HttpStatus,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req,@Res() res) {
    const rta = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json(rta);
  }

  @Post('register')
  async register(@Res() res, @Body() registerDTO: RegisterDTO) {
    const userRegistered = await this.authService.register(registerDTO);
    return res.status(HttpStatus.OK).json(userRegistered);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'POST',
    action: 'read',
    possession: 'any'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfileUser(@Request() req) {
    return 'bienvenido';
  }
}
