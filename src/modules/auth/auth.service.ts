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
    if(!user){
      return null;
    }
    if (await bcrypt.compare(pass, user.password)) {
      const { password, username, roles } = user;
      return {password,username,roles};
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userId: user._id,
      username: user.username,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.sign(payload),
      userData: {
        username: user.username
      },
    };
  }

  async register(registerDTO: RegisterDTO) {
    const { username, password } = registerDTO;
    const userExists = await this.usersService.getUserByUsername(username);
    if (userExists) {
      throw new ConflictException(`username or email already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser({
      ...registerDTO
    });
  }


}
