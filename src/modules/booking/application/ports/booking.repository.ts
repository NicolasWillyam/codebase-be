import { CreateBookingDto } from '../../infrastructure/dto/create-booking.dto';
import { BookingEntity } from '../booking.entity';
import { TourEntity } from '@/modules/tour/domain/tour.entity';
import { HomestayEntity } from '@/modules/homestay/domain/homestay.entity';

export interface BookingRepository {
  createBooking(dto: CreateBookingDto): Promise<BookingEntity>;
  findAllBookings(): Promise<BookingEntity[]>;
  findById(id: string): Promise<BookingEntity | null>;
  createBooking(data: Partial<BookingEntity>): Promise<BookingEntity>;
  updateStatus(id: string, status: 'confirmed' | 'cancelled'): Promise<void>;
  findByEmail(email: string): Promise<BookingEntity[]>;
  checkAvailability(homestayId: string, checkInDate: Date, checkOutDate: Date): Promise<boolean>;
  
  // New methods for payment integration
  findTourById(id: string): Promise<TourEntity>;
  findHomestayById(id: string): Promise<HomestayEntity>;
  updatePaymentStatus(id: string, paymentStatus: 'pending' | 'completed' | 'failed'): Promise<void>;
}
