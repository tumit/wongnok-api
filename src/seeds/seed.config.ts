import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { dataSourceOpts } from '../db/db.config';

const options: DataSourceOptions & SeederOptions = {
    ...dataSourceOpts,
    seeds: ['dist/**/*.seeder.js'],
    factories: ['dist/**/*.factory.js'],
};

export const dataSource = new DataSource(options);