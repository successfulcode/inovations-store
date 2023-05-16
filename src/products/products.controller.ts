import { ProductsService } from './products.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }
  
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }
}
