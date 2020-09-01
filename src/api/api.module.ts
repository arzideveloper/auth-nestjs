import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ProductsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [],
})
export class ApiModule {}
