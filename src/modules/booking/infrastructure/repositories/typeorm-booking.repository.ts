import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingRepository } from '../../application/ports/booking.repository';
import { BookingEntity } from '../../application/booking.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingStatus } from '../../application/constants/booking-status.enum';
import { UpdateBookingDto } from '../dto/update-booking.dto';

@Injectable()
export class TypeOrmBookingRepository implements BookingRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
  ) {}

  async createBooking(data: Partial<BookingEntity>): Promise<BookingEntity> {
    const booking = this.bookingRepo.create(data);
    return await this.bookingRepo.save(booking);
  }

  async findAllBookings(): Promise<BookingEntity[]> {
    return this.bookingRepo.find({
      relations: ['tour'],
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ 1. Lấy booking theo ID
  async findById(id: string): Promise<BookingEntity | null> {
    return this.bookingRepo.findOne({
      where: { id },
      relations: ['tour'],
    });
  }

  // ✅ 2. Cập nhật trạng thái (confirmed, cancelled)
  async updateStatus(
    id: string,
    status: 'confirmed' | 'cancelled',
  ): Promise<void> {
    await this.bookingRepo.update(id, {
      status: status as BookingStatus,
    });
  }

  async update(id: string, dto: UpdateBookingDto): Promise<BookingEntity> {
    await this.bookingRepo.update(id, dto);
    return this.bookingRepo.findOneBy({ id });
  }

  // ✅ 3. Tìm booking của 1 user theo email
  async findByEmail(email: string): Promise<BookingEntity[]> {
    return this.bookingRepo.find({
      where: { email },
      relations: ['tour'],
      order: { createdAt: 'DESC' },
    });
  }
}
