// datasource.ts
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

// load config
dotenvConfig();

export const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  logging: `${process.env.DATABASE_LOGGING}` === 'true',
  url: `${process.env.DATABASE_URL}`
};

export const dataSource = new DataSource(dataSourceOpts);
