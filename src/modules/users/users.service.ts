import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDTO } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(userID: string): Promise<User> {
    return await this.userModel.findById(userID).exec();
  }

  async createUser(DTO: UserDTO): Promise<User> {
    return await new this.userModel(DTO).save();
  }

  async updateUser(userID: string, DTO: RegisterDTO): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userID, DTO, {
      new: true, //esto en true devuelve el registro insertado
    });
  }

  async deleteUser(userID: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userID);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return await this.userModel.findOne({ username }).exec();
  }
}
