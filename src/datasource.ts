// datasource.ts
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// load config
dotenvConfig();

export const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  logging: false,
  url: `${process.env.DATABASE_URL}`
};

export const dataSource = new DataSource(dataSourceOpts);
