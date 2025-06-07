import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';

interface GetBookingsOptions {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}

@Injectable()
export class GetBookingsUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(options: GetBookingsOptions = {}) {
    const { page = 1, limit = 10, status, startDate, endDate } = options;
    const skip = (page - 1) * limit;

    const [bookings, total] = await this.bookingRepository.findAndCount({
      skip,
      take: limit,
      where: {
        ...(status && { status }),
        ...(startDate && { startDate: { $gte: startDate } }),
        ...(endDate && { startDate: { $lte: endDate } }),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      items: bookings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
