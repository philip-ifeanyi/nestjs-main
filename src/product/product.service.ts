import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) {}

  async findAll():Promise<Product[]> {
    return this.findAll();
  }

  async create(data: any):Promise<Product> {
    return new this.productModel(data)
  }

  async findOne(id: number):Promise<Product> {
    return this.productModel.findOne({ where: { id: id } })
  }

  async update(id: number, data: any):Promise<Product> {
    return this.productModel.findOneAndUpdate({ where: { id: id} }, data)
  }

  async delete(id: number):Promise<void> {
    return this.productModel.findOneAndDelete({ where: { id: id} })
  }
}
