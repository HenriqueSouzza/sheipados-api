import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/user/user.module';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { AuthService } from '@/auth/auth.service';
import { ProductController } from './product.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Product])],
  providers: [ProductService, AuthService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
