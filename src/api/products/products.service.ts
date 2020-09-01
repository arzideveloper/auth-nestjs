import { IProduct } from './products.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ProductDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private productsModel: Model<IProduct>,
  ) {}

  async getProducts(): Promise<IProduct[]> {
    return await this.productsModel.find();
  }

  async getProductById(productID: string): Promise<IProduct> {
    return await this.productsModel.findById(productID);
  }

  async createProduct(DTO: ProductDTO): Promise<IProduct> {
    return await new this.productsModel(DTO).save();
  }

  async updateProduct(productID: string, DTO: ProductDTO): Promise<IProduct> {
    return await this.productsModel.findByIdAndUpdate(productID, DTO, {
      new: true,
    });
  }

  async deleteProduct(productID: string): Promise<IProduct> {
    return await this.productsModel.findByIdAndDelete(productID);
  }
}
