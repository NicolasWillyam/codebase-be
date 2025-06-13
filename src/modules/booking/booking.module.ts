import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBookingUseCase } from './application/use-cases/create-booking.use-case';

import { TypeOrmBookingRepository } from './infrastructure/repositories/typeorm-booking.repository';
import { BookingEntity } from './application/booking.entity';
import { GetBookingsUseCase } from './application/use-cases/get-bookings.use-case';
import { GetBookingDetailUseCase } from './application/use-cases/get-booking-detail.use-case';
import { GetMyBookingsUseCase } from './application/use-cases/get-my-bookings.use-case';
import { HomestayBookingController } from './infrastructure/controllers/homestay.booking.controller';
import { CreateHomestayBookingUseCase } from './application/use-cases/create-homestay-booking.use-case';
import { UpdateBookingUseCase } from './application/use-cases/update-booking-status.use-case';
import { GetAllBookingsUseCase } from './application/use-cases/get-all-bookings.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  controllers: [HomestayBookingController],
  providers: [
    {
      provide: 'BookingRepository',
      useClass: TypeOrmBookingRepository,
    },
    CreateBookingUseCase,
    GetAllBookingsUseCase,
    GetBookingsUseCase,
    GetBookingDetailUseCase,
    UpdateBookingUseCase,
    GetMyBookingsUseCase,
    CreateHomestayBookingUseCase,
  ],
})
export class BookingModule {}
