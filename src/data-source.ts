// db.config.ts
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

// load config
dotenvConfig({ quiet: true });

export const dataSourceOpts: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  logging: true,
  url: `${process.env.DATABASE_URL}`,
  ssl: `${process.env.DB_SSL}` === 'true',
  synchronize: `${process.env.DB_SYNCHRONIZE}` === 'true',
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  seeds: ['dist/**/*.seeder.js'],
  factories: ['dist/**/*.factory.js'],
};

export const dataSource = new DataSource(dataSourceOpts);
