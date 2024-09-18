import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      logging: false,
      entities: [join(__dirname, '**', '**', '**', '*.entity.{ts,js}')],
      migrationsTableName: 'typeorm_migrations',
      migrations: [join(__dirname, '..', 'migrations', '*.ts')],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }