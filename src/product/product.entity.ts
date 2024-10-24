import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  code_ean: string;

  @Column()
  product_name: string;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  expired_date: Date;

  @Column()
  code_ncm: string;
  
  @Column()
  code_cest: string;

  @Column()
  code_cfop: string;
  
  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}