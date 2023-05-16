import { Injectable } from '@nestjs/common';
import { data } from 'src/data';

@Injectable()
export class ProductsService {

  getProducts() {
    return data;
  }
}
