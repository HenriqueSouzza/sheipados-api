export class ProductDto {
  code_ean?: string
  product_name?: string
  category?: string
  brand?: string
  expired_date?: Date
  code_ncm?: string
  code_cest?: string
  code_cfop?: string
  isActive?: boolean
  value_last_pushase?: string;
  cost_price?: string;
  profit_margin?: string;
  current_stock?: number;
}