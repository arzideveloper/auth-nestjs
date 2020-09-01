import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Route } from './schemas/route.schema';
@Injectable()
export class RoutesService {
  constructor(@InjectModel('Routes') private routeModel: Model<Route>) {}

  async validateRoute(routeMatch: string, reqMethod: string, roleUser: string) {
    const routeDB = await this.getRoute(routeMatch);
    if (!routeDB) {
      return false;
    }
    if (!routeDB.roles.includes(roleUser)) {
      return false;
    }
    if (!routeDB.methods.includes(reqMethod)) {
      return false;
    }
    return true;
  }

  async getRoute(route: string): Promise<Route> {
    return await this.routeModel.findOne({ path: route }).exec();
  }

  async insertRoutes(route) {
    await new this.routeModel(route).save();
    console.log('insertando ruta:' + route);
  }

  async deleteRoutes() {
    await this.routeModel.deleteMany({});
  }
}
