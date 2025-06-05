import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Hàm cấu hình TypeORM cho kết nối PostgreSQL.
 * Sử dụng biến môi trường, có giá trị mặc định để dễ dàng phát triển và debug.
 */
export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',

  // Thông tin kết nối cơ bản
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'mydb',

  // Tự động load tất cả các entity từ project
  autoLoadEntities: true,

  /**
   * synchronize: true sẽ tự động tạo bảng theo entity.
   * => KHÔNG nên bật ở production vì có thể làm mất dữ liệu.
   */
  synchronize: process.env.NODE_ENV !== 'production',

  /**
   * logging: Bật log SQL nếu TYPEORM_LOGGING = 'true' trong file .env.
   * Hữu ích khi debug hoặc kiểm tra truy vấn được tạo.
   */
  logging: process.env.TYPEORM_LOGGING === 'true',
});
