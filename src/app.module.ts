import { Module } from '@nestjs/common';
import configService from './ormservice.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
})
export class AppModule { }