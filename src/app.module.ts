import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { TourModule } from './modules/tour/tour.module';
import { BookingModule } from './modules/booking/booking.module';
import { ReviewModule } from './modules/review/review.module';
import { HomestayModule } from './modules/homestay/homestay.module';

@Module({
  imports: [
    ConfigModule, // <-- Import custom config module (global)
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: true,
      }),
    }),
    AuthModule,
    TourModule,
    BookingModule,
    ReviewModule,
    HomestayModule,
  ],
})
export class AppModule {}
