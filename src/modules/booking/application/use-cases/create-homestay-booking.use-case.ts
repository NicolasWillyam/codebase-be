import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { CreateHomestayBookingDto } from '../../infrastructure/dto/create-homestay-booking.dto';
import { BookingEntity } from '../booking.entity';
import { BookingStatus } from '../constants/booking-status.enum';

@Injectable()
export class CreateHomestayBookingUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(dto: CreateHomestayBookingDto): Promise<BookingEntity> {
    return this.bookingRepo.createBooking({
      ...dto,
      type: 'homestay',
      status: BookingStatus.Pending,
      checkInDate: new Date(dto.checkInDate),
      checkOutDate: new Date(dto.checkOutDate),
    });
  }
}
