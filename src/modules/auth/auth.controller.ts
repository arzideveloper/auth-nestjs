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
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() res, @Body() loginDTO: LoginDTO) {
    const rta = await this.authService.login(loginDTO);
    return res.status(HttpStatus.OK).json(rta);
  }

  @Post('register')
  async register(@Res() res, @Body() registerDTO: RegisterDTO) {
    const userRegistered = await this.authService.register(registerDTO);
    return res.status(HttpStatus.OK).json(userRegistered);
  }

  @Get('profile')
  async getProfileUser(@Request() req) {
    return req.user;
  }
}
