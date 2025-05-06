// backend/src/config/config.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// Load cấu hình từng phần (mỗi config 1 namespace)
import databaseConfig from './database.config';
// import geminiConfig from './gemini.config'; // Bạn có thể mở lại khi cần

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigModule dùng toàn cục, không cần import lại ở các module khác
      load: [
        databaseConfig,
        // geminiConfig
      ],
      validationSchema: Joi.object({
        /**
         * ==== App Environment ====
         */
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        PORT: Joi.number().default(3000), // Cổng mặc định chạy app NestJS

        /**
         * ==== PostgreSQL Database ====
         */
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),

        /**
         * ==== JWT Authentication ====
         */
        JWT_SECRET: Joi.string().required(), // Bắt buộc có để sign/verify token
        JWT_EXPIRES_IN: Joi.string().default('1d'), // Token expiration (VD: 1d, 15m)

        /**
         * ==== (Optional) External services like Gemini ====
         */
        // GEMINI_API_KEY: Joi.string().optional(),
      }),
      validationOptions: {
        abortEarly: false, // Hiển thị tất cả lỗi khi thiếu biến, không chỉ lỗi đầu tiên
      },
    }),
  ],
})
export class ConfigModule {}
