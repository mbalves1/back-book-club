import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5439,
  username: 'bookclub',
  password: '123',
  database: 'bookclub',
};

export default config;
