import { Inject, Injectable, Logger } from '@nestjs/common';
import { BookingRepository } from '../ports/booking.repository';
import { CreateBookingDto } from '../../infrastructure/dto/create-booking.dto';
import { BookingEntity } from '../booking.entity';
import { BookingStatus } from '../constants/booking-status.enum';
import { PaymentService } from '@/modules/payment/application/payment.service';

@Injectable()
export class CreateBookingUseCase {
  private readonly logger = new Logger(CreateBookingUseCase.name);

  constructor(
    @Inject('BookingRepository')
    private readonly bookingRepo: BookingRepository,
    @Inject('PaymentService')
    private readonly paymentService: PaymentService,
  ) {}

  async execute(dto: CreateBookingDto): Promise<BookingEntity> {
    try {
      // Calculate total amount based on booking type
      let totalAmount: number;
      if (dto.type === 'tour') {
        // Get tour price from tour service
        const tour = await this.bookingRepo.findTourById(dto.tourId);
        totalAmount = tour.price * dto.numberOfGuests;
      } else {
        // Get homestay price and calculate based on number of nights
        const homestay = await this.bookingRepo.findHomestayById(dto.homestayId);
        const nights = this.calculateNights(dto.checkInDate, dto.checkOutDate);
        totalAmount = homestay.pricePerNight * nights * dto.numberOfGuests;
      }

      // Create payment record
      const payment = await this.paymentService.createPayment({
        amount: totalAmount,
        currency: 'VND',
        description: `Booking ${dto.type} for ${dto.fullName}`,
        metadata: {
          bookingType: dto.type,
          numberOfGuests: dto.numberOfGuests,
        },
      });

      // Create booking with payment info
      const booking = await this.bookingRepo.createBooking({
        ...dto,
        status: BookingStatus.Pending,
        paymentId: payment.id,
        totalAmount,
        paymentStatus: 'pending',
      });

      this.logger.log(`Created booking with ID: ${booking.id} and payment ID: ${payment.id}`);
      return booking;

    } catch (error) {
      this.logger.error(`Failed to create booking: ${error.message}`, error.stack);
      throw error;
    }
  }

  private calculateNights(checkInDate: Date, checkOutDate: Date): number {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
