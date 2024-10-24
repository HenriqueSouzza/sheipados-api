import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  findAll(): Promise<ProductDto[]> {
    return this.productRepository.find({
      select: {
        code_ean: true,
        product_name: true,
        category: true,
        brand: true,
        expired_date: true,
        code_cest: true,
        code_ncm: true,
        code_cfop: true,
      }
    });
  }

  async findBy({ ...where }: ProductDto): Promise<Product> {
    return this.productRepository.findOne({ where });
  }

  async create(body: CreateProductDto): Promise<ProductDto> {
    const user = this.productRepository.create({ ...body });
    return await this.productRepository.save(user);
  }

  async update(code_ean: string, body: Partial<Product>): Promise<ProductDto> {
    const createProduct = this.productRepository.create(body);
    await this.productRepository.update({ code_ean }, createProduct);
    return this.findBy({ code_ean });
  }

  async remove(code_ean: string): Promise<void> {
    await this.productRepository.delete({ code_ean });
  }
}