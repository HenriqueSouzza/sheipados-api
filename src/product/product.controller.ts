import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Get(':code_ean')
  findOne(@Param('code_ean') code_ean: string): Promise<ProductDto> {
    return this.productService.findBy({ code_ean });
  }

  @Post()
  create(@Body() body: CreateProductDto): Promise<ProductDto> {
    return this.productService.create(body);
  }

  @Put(':code_ean')
  update(@Param('code_ean') code_ean: string, @Body() user: UpdateProductDto): Promise<ProductDto> {
    return this.productService.update(code_ean, user);
  }

  @Delete(':code_ean')
  remove(@Param('code_ean') code_ean: string): Promise<void> {
    return this.productService.remove(code_ean);
  }
}