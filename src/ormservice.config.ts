import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      logging: false,
      entities: [join(__dirname, '**', '**', '**', '*.entity.{ts,js}')],
      migrationsTableName: 'migration',
      migrations: [join(__dirname, '..', 'migrations', '*.ts')],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    };
  }
}

const configService = new ConfigService(process.env);

export default configService;