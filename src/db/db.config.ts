// db.config.ts
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// load config
dotenvConfig({quiet: true});

export const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT}`, 10),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  ssl: `${process.env.DB_SSL}` === 'true',
  synchronize: `${process.env.DB_SYNCHRONIZE}` === 'true',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

export default registerAs('typeormOpts', () => ({
  ...dataSourceOpts,
  autoLoadEntities: `${process.env.DB_AUTO_LOAD_ENTITIES}` === 'true',
  logging: true
}));

export const dataSource = new DataSource(dataSourceOpts);
