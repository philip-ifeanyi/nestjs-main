import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://kami:yr1Z0qvLH72YRUSF@db.u001dhn.mongodb.net/?retryWrites=true&w=majority", {autoCreate: true}),
    ProductModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
