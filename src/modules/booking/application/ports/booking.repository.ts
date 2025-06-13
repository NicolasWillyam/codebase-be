import { CreateBookingDto } from '../../infrastructure/dto/create-booking.dto';
import { UpdateBookingDto } from '../../infrastructure/dto/update-booking.dto';
import { BookingEntity } from '../booking.entity';

export interface BookingRepository {
  createBooking(dto: CreateBookingDto): Promise<BookingEntity>;
  findAllBookings(): Promise<BookingEntity[]>;
  findById(id: string): Promise<BookingEntity | null>;
  createBooking(data: Partial<BookingEntity>): Promise<BookingEntity>;
  updateStatus(id: string, status: 'confirmed' | 'cancelled'): Promise<void>;
  update(id: string, dto: UpdateBookingDto): Promise<BookingEntity>;
  findByEmail(email: string): Promise<BookingEntity[]>;
}
