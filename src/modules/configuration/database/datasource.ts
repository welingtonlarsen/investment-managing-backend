import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

console.log(process.env.TYPEORM_HOST);

export const options: PostgresConnectionOptions = (() => {
  return {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [process.env.TYPEORM_ENTITIES],
    logging: process.env.TYPEORM_LOGGING === 'true',
    synchronize: false,
    database: process.env.TYPEORM_DATABASE,
    migrations: [process.env.TYPEORM_MIGRATIONS],
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    supportBigNumbers: true,
  };
})();

const dataSource = new DataSource(options);

export default dataSource;
