import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { createHmac } from 'crypto';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstLogin: boolean;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      this.password = createHmac('sha256', this.password).digest('hex');
    }
  }

  @BeforeUpdate()
  @BeforeInsert()
  setFirstLogin() {
    if (this.password) {
      this.firstLogin = this.password === createHmac('sha256', process.env.PASSWORD_DEFAULT).digest('hex');
    }
  }

  @BeforeInsert()
  beforeUpdate() {
    this.isActive = true;
  }
}