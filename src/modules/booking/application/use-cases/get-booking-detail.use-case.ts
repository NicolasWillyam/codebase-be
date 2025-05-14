import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { BookingEntity } from '../booking.entity';

@Injectable()
export class GetBookingDetailUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(id: string): Promise<BookingEntity> {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }
}
