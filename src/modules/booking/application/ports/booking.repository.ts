import { CreateBookingDto } from '../../infrastructure/dto/create-booking.dto';
import { BookingEntity } from '../booking.entity';

export interface BookingRepository {
  createBooking(dto: CreateBookingDto): Promise<BookingEntity>;
  findAllBookings(): Promise<BookingEntity[]>;
  findById(id: string): Promise<BookingEntity | null>;
  createBooking(data: Partial<BookingEntity>): Promise<BookingEntity>;
  updateStatus(id: string, status: 'confirmed' | 'cancelled'): Promise<void>;
  findByEmail(email: string): Promise<BookingEntity[]>;
}
