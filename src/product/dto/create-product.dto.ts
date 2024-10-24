import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  code_ean: string

  @IsNotEmpty()
  product_name: string

  @IsNotEmpty()
  category: string

  @IsNotEmpty()
  brand: string

  @IsDate()
  expired_date: Date

  @IsNotEmpty()
  code_ncm: string

  @IsNotEmpty()
  code_cest: string

  @IsNotEmpty()
  code_cfop: string

  @IsNotEmpty()
  isActive: boolean
}