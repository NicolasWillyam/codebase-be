import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'mydb',
  autoLoadEntities: true, // Tự động load các Entity không cần khai báo thủ công
  synchronize: process.env.NODE_ENV !== 'production', // Không dùng true ở môi trường thật
  logging: process.env.TYPEORM_LOGGING === 'true', // Có thể bật/tắt qua .env
});
