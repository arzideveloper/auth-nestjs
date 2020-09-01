import { ProductDTO } from './products.dto';
import { ProductsService } from './products.service';
import {
  Controller,
  Get,
  Res,
  Body,
  HttpStatus,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  private async getAllProducts(@Res() res: any) {
    const product = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(product);
  }

  @Get(':id')
  private async getProductById(@Res() res: any, @Param() params) {
    const products = await this.productService.getProductById(params.id);
    return res.status(HttpStatus.OK).json(products);
  }

  @Post('')
  private async createProduct(@Res() res: any, @Body() DTO: ProductDTO) {
    const product = await this.productService.createProduct(DTO);
    return res.status(HttpStatus.OK).json(product);
  }

  @Put(':id')
  private async updateProduct(
    @Res() res: any,
    @Param() params,
    @Body() DTO: ProductDTO,
  ) {
    const product = await this.productService.updateProduct(params.id, DTO);
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/:id')
  private async deleteProduct(@Res() res: any, @Param() params) {
    const product = await this.productService.deleteProduct(params.id);
    return res.status(HttpStatus.OK).json(product);
  }
}
