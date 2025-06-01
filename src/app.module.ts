import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { ConfigModule } from './config/config.module'; // Module cấu hình tùy chỉnh
import { AuthModule } from './modules/auth/auth.module'; // Xác thực người dùng
import { TourModule } from './modules/tour/tour.module'; // Quản lý tour
import { BookingModule } from './modules/booking/booking.module'; // Đặt tour/homestay
import { ReviewModule } from './modules/review/review.module'; // Đánh giá
import { HomestayModule } from './modules/homestay/homestay.module'; // Quản lý homestay

@Module({
  imports: [
    ConfigModule, // Nạp module cấu hình dùng toàn bộ
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true, // Tự động load entity (không cần khai báo thủ công)
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // Đồng bộ schema DB (chỉ nên dùng khi phát triển)
        logging: true, // Bật log SQL
      }),
    }),
    AuthModule,     // Module xác thực
    TourModule,     // Module tour
    BookingModule,  // Module đặt chỗ
    ReviewModule,   // Module đánh giá
    HomestayModule, // Module homestay
  ],
})
export class AppModule {}
