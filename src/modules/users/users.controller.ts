import { RolesGuard } from './../auth/roles.guard';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  private async getAllUsers(@Res() res: any) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  private async getUserById(@Res() res: any, @Param() params) {
    const user = await this.userService.getUserById(params.id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  private async createUser(@Res() res: any, @Body() DTO: UserDTO) {
    const user = await this.userService.createUser(DTO);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':id')
  private async updateUser(@Res() res: any, @Param() params, @Body() DTO: UserDTO) {
    const user = await this.userService.updateUser(params.id, DTO);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete(':id')
  private deleteUser(@Res() res: any, @Param() params) {
    const user = this.userService.deleteUser(params.id);
    return res.status(HttpStatus.OK).json(user);
  }
}
