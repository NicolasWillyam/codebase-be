import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBookingUseCase } from './application/use-cases/create-booking.use-case';
import { TourBookingController } from './infrastructure/controllers/tour.booking.controller';
import { CreateHomestayBookingUseCase } from './application/use-cases/create-homestay-booking.use-case';
import { TypeOrmBookingRepository } from './infrastructure/repositories/typeorm-booking.repository';
import { BookingEntity } from './application/booking.entity';
import { GetBookingsUseCase } from './application/use-cases/get-bookings.use-case';
import { GetBookingDetailUseCase } from './application/use-cases/get-booking-detail.use-case';
import { UpdateBookingStatusUseCase } from './application/use-cases/update-booking-status.use-case';
import { GetMyBookingsUseCase } from './application/use-cases/get-my-bookings.use-case';
import { HomestayBookingController } from './infrastructure/controllers/homestay.booking.controller';
import { CreateHomestayBookingDto } from './infrastructure/dto/create-homestay-booking.dto';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  controllers: [TourBookingController, HomestayBookingController],
  providers: [
    {
      provide: 'BookingRepository',
      useClass: TypeOrmBookingRepository,
    },
    CreateBookingUseCase,
    GetBookingsUseCase,
    CreateHomestayBookingUseCase,
    GetBookingDetailUseCase,
    UpdateBookingStatusUseCase,
    GetMyBookingsUseCase,
  ],
})
export class BookingModule {}
