import 'dotenv/config'
import { join } from 'path';
import { DataSource, DataSourceOptions } from "typeorm";

const isDev = process.env.ENVIRONMENT === 'dev';

export const config: DataSourceOptions = ({
  type: 'mysql',
  host: isDev ? '172.17.0.1' : process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  entities: [join(__dirname, '**', '**', '**', '*.entity.{ts,js}')],
  migrations: ['./src/database/migrations/*.ts'],
})

export const connectionSource = new DataSource(config as DataSourceOptions);