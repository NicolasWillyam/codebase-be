import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';

@Injectable()
export class UpdateBookingStatusUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(id: string, status: 'confirmed' | 'cancelled') {
    await this.bookingRepo.updateStatus(id, status);
  }
}
