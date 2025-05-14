import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { CreateBookingDto } from '../../infrastructure/dto/create-booking.dto';

@Injectable()
export class CreateBookingUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(dto: CreateBookingDto) {
    return this.bookingRepo.createBooking(dto);
  }
}
