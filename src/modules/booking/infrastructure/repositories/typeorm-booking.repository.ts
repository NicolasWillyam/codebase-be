import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { BookingRepository } from '../../application/ports/booking.repository';
import { BookingEntity } from '../../application/booking.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingStatus } from '../../application/constants/booking-status.enum';
import { TourEntity } from '@/modules/tour/domain/tour.entity';
import { HomestayEntity } from '@/modules/homestay/domain/homestay.entity';

@Injectable()
export class TypeOrmBookingRepository implements BookingRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
    @InjectRepository(TourEntity)
    private readonly tourRepo: Repository<TourEntity>,
    @InjectRepository(HomestayEntity)
    private readonly homestayRepo: Repository<HomestayEntity>,
  ) {}

  async createBooking(data: Partial<BookingEntity>): Promise<BookingEntity> {
    const booking = this.bookingRepo.create(data);
    return await this.bookingRepo.save(booking);
  }

  async findAllBookings(): Promise<BookingEntity[]> {
    return this.bookingRepo.find({
      relations: ['tour', 'homestay'],
      order: { createdAt: 'DESC' },
    });
  }

  //  1. Lấy booking theo ID
  async findById(id: string): Promise<BookingEntity | null> {
    return this.bookingRepo.findOne({
      where: { id },
      relations: ['tour', 'homestay'],
    });
  }

  //  2. Cập nhật trạng thái (confirmed, cancelled)
  async updateStatus(
    id: string,
    status: 'confirmed' | 'cancelled',
  ): Promise<void> {
    await this.bookingRepo.update(id, {
      status: status as BookingStatus,
    });
  }

  //  3. Tìm booking của 1 user theo email
  async findByEmail(email: string): Promise<BookingEntity[]> {
    return this.bookingRepo.find({
      where: { email },
      relations: ['tour', 'homestay'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByEmail(email: string): Promise<BookingEntity[]> {
    return this.bookingRepo.find({
      where: { email },
      relations: ['tour'],
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ Thêm phương thức mới từ nhánh feature/booking
  async findAndCountByEmail(
    email: string,
    options: {
      skip?: number;
      take?: number;
      where?: {
        status?: string;
      };
      order?: {
        [key: string]: 'ASC' | 'DESC';
      };
    },
  ): Promise<[BookingEntity[], number]> {
    const { skip, take, where, order } = options;
    return this.bookingRepo.findAndCount({
      where: {
        email,
        ...(where?.status && { status: where.status as BookingStatus }),
      },
      relations: ['tour'],
      skip,
      take,
      order: order || { createdAt: 'DESC' },
    });
  }

  // ✅ Thêm phương thức checkAvailability từ nhánh main
  async checkAvailability(
    homestayId: string,
    checkInDate: Date,
    checkOutDate: Date,
  ): Promise<boolean> {
    const overlappingBookings = await this.bookingRepo.find({
      where: [
        { // Existing booking starts within the requested dates
          homestayId,
          status: BookingStatus.Confirmed,
          checkInDate: Between(checkInDate, checkOutDate),
        },
        { // Existing booking ends within the requested dates
          homestayId,
          status: BookingStatus.Confirmed,
          checkOutDate: Between(checkInDate, checkOutDate),
        },
        { // Existing booking spans the requested dates
          homestayId,
          status: BookingStatus.Confirmed,
          checkInDate: '<= :checkInDate', // Using parameters to avoid SQL injection
          checkOutDate: '>= :checkOutDate',
        }
      ],
      parameters: { checkInDate, checkOutDate },
    });

    return overlappingBookings.length === 0;
  }

  // New methods for payment integration
  async findTourById(id: string): Promise<TourEntity> {
    const tour = await this.tourRepo.findOneBy({ id });
    if (!tour) {
      throw new Error(`Tour with id ${id} not found`);
    }
    return tour;
  }

  async findHomestayById(id: string): Promise<HomestayEntity> {
    const homestay = await this.homestayRepo.findOneBy({ id });
    if (!homestay) {
      throw new Error(`Homestay with id ${id} not found`);
    }
    return homestay;
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: 'pending' | 'completed' | 'failed',
  ): Promise<void> {
    await this.bookingRepo.update(id, { paymentStatus });
  }
}

