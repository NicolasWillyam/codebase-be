// backend/src/config/config.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// Load từng phần cấu hình theo từng namespace
import databaseConfig from './database.config';
// import geminiConfig from './gemini.config'; // Bỏ comment khi sử dụng Gemini

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Dùng toàn cục, không cần import ở các module khác
      load: [
        databaseConfig,
        // geminiConfig, // <-- Kích hoạt khi cần
      ],
      validationSchema: Joi.object({
        /** ==== App Environment ==== */
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        PORT: Joi.number().default(3000),

        /** ==== PostgreSQL Database ==== */
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),

        /** ==== JWT Authentication ==== */
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('1d'),

        /** ==== Optional External Services ==== */
        // GEMINI_API_KEY: Joi.string().optional(),
      }),
      validationOptions: {
        abortEarly: false, // Hiển thị tất cả lỗi validation
      },
    }),
  ],
})
export class ConfigModule {}
