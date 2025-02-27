import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/entities/user.entity';


dotenv.config();

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
const db :TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true
}
  return db
};