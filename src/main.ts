import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Tạo ứng dụng Nest từ AppModule
  const app = await NestFactory.create(AppModule);

  // Lấy ConfigService để đọc biến môi trường
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap'); // Tạo logger để log ra màn hình

  // ======= Sử dụng ValidationPipe toàn cục =======
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các thuộc tính không nằm trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có thuộc tính lạ không được khai báo
      transform: true, // Tự động chuyển kiểu dữ liệu về đúng kiểu khai báo trong DTO
    }),
  );

  // ======= Cấu hình Swagger (nếu bật) =======
  const isSwaggerEnabled = configService.get<boolean>('SWAGGER_ENABLED', true); // Kiểm tra có bật Swagger không
  const swaggerPath = configService.get<string>('SWAGGER_PATH', 'api/docs'); // Đường dẫn Swagger

  if (isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Tài liệu API NestJS') // Tiêu đề tài liệu
      .setDescription('Trang tài liệu API backend') // Mô tả
      .setVersion('1.0') // Phiên bản
      .addBearerAuth() // Thêm xác thực Bearer Token
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerPath, app, document);

    logger.log(`Tài liệu Swagger có sẵn tại: /${swaggerPath}`);
  }

  // ======= Khởi động ứng dụng trên cổng =======
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.log(`Ứng dụng đang chạy tại: http://localhost:${port}`);
}

bootstrap(); // Gọi hàm khởi động
