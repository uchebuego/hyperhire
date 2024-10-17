import 'dotenv/config';
import { DataSource } from 'typeorm';

const configService = {
  get(key: string): string {
    return process.env[key];
  },
};

export const typeormConfig = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  autoLoadEntities: true,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/*.js'],
  entities: [__dirname + '/../**/*.entity.js'],
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
};

export default new DataSource(typeormConfig as any);
