import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { BookingEntity } from '../booking.entity';

interface GetMyBookingsOptions {
  page?: number;
  limit?: number;
  status?: string;
}

@Injectable()
export class GetMyBookingsUseCase {
  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(email: string, options: GetMyBookingsOptions = {}): Promise<{
    items: BookingEntity[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, status } = options;
    const skip = (page - 1) * limit;

    const [bookings, total] = await this.bookingRepo.findAndCountByEmail(email, {
      skip,
      take: limit,
      where: status ? { status } : undefined,
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
