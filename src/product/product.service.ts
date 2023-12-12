import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) {}

  async findAll() {
    return this.findAll().exec();
  }
}
