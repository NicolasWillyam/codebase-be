import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { BookingEntity } from '../booking.entity';

@Injectable()
export class GetAllBookingsUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(): Promise<BookingEntity[]> {
    return this.bookingRepo.findAllBookings();
  }
}
