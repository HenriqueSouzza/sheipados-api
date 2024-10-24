import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, AuthService],
  exports: [ProductService],
})
export class UserModule { }
