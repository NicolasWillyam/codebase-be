// src/modules/booking/application/use-cases/update-booking.use-case.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { UpdateBookingDto } from '../../infrastructure/dto/update-booking.dto';

@Injectable()
export class UpdateBookingUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(id: string, dto: UpdateBookingDto) {
    const existing = await this.bookingRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return this.bookingRepo.update(id, dto);
  }
}
