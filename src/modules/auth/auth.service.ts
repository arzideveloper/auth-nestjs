import { RegisterDTO } from '../users/dto/register.dto';
import { LoginDTO } from '../users/dto/login.dto';

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (user[0] && (await bcrypt.compare(pass, user[0].password))) {
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }

  async register(registerDTO: RegisterDTO) {
    const { username, password } = registerDTO;
    const userExists = await this.usersService.getUserByUsername(username);
    if (userExists) {
      throw new ConflictException(`username o email already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser({
      ...registerDTO,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDTO) {
    const { username, password } = loginDto;
    const user = await this.usersService.getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Datos de acceso incorrectos');
    }

    const payload = {
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.sign(payload),
      userData: {
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
