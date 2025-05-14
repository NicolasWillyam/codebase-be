import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { BookingEntity } from '../booking.entity';

@Injectable()
export class GetMyBookingsUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(email: string): Promise<BookingEntity[]> {
    return this.bookingRepo.findByEmail(email);
  }
}
