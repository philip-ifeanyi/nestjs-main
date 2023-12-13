import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService
    ) {}

  @Get()
  async findAll() {
    return this.productService.findAll()
  }

  @Post('/:id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id)
    const data = {
      likes: product.likes+1
    }
    
    this.httpService
      .post(`http://localhost:8080/api/products/${id}/like`, {})
      .subscribe(res => {
        console.log(res);
      })
    return this.productService.update(id, data)
  }

  @EventPattern("product_created")
  async productCreated(product: any) {
    this.productService.create({
      title: product.title,
      likes: product.likes,
      image: product.image,
      id: product.id
    })

    console.log("created product and logging results from RabbitMQ");
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    const data = {
      title: product.title,
      likes: product.likes,
      image: product.image,
      id: product.id
    }

    this.productService.update(product.id, data)
    console.log("updated product and logging results from RabbitMQ");
  }

  @EventPattern("product_deleted")
  async productDeleted(id: number) {
    await this.productService.delete(id)
  }
}
