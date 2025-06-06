import { Inject, Injectable, Logger } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { CreateHomestayBookingDto } from '../../infrastructure/dto/create-homestay-booking.dto';
import { BookingEntity } from '../booking.entity';
import { BookingStatus } from '../constants/booking-status.enum';
import { 
  BookingException, 
  InvalidBookingDatesError,
  BookingNotAvailableError,
  InvalidGuestCountError 
} from '../exceptions/booking.exception';

@Injectable()
export class CreateHomestayBookingUseCase {
  private readonly logger = new Logger(CreateHomestayBookingUseCase.name);

  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
  ) {}

  async execute(dto: CreateHomestayBookingDto): Promise<BookingEntity> {
    try {
      // Validate dates
      const checkInDate = new Date(dto.checkInDate);
      const checkOutDate = new Date(dto.checkOutDate);
      
      if (checkOutDate <= checkInDate) {
        throw new InvalidBookingDatesError();
      }

      // TODO: Add availability check
      // const isAvailable = await this.checkHomestayAvailability(dto.homestayId, checkInDate, checkOutDate);
      // if (!isAvailable) {
      //   throw new BookingNotAvailableError('homestay', dto.homestayId);
      // }

      // TODO: Add guest count validation
      // const maxGuests = await this.getHomestayMaxGuests(dto.homestayId);
      // if (dto.numberOfGuests > maxGuests) {
      //   throw new InvalidGuestCountError(maxGuests);
      // }

      const booking = await this.bookingRepo.createBooking({
        ...dto,
        type: 'homestay',
        status: BookingStatus.Pending,
        checkInDate,
        checkOutDate,
      });

      this.logger.log(`Created homestay booking with ID: ${booking.id}`);
      return booking;

    } catch (error) {
      this.logger.error(`Failed to create homestay booking: ${error.message}`, error.stack);
      
      if (error instanceof BookingException) {
        throw error;
      }
      
      throw new BookingException(`Failed to create booking: ${error.message}`);
    }
  }
}
