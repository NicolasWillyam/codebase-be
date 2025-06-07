import { 
  Body, 
  Controller, 
  Post, 
  HttpCode, 
  HttpStatus,
  HttpException,
  Logger
} from '@nestjs/common';
import { CreateHomestayBookingUseCase } from '../../application/use-cases/create-homestay-booking.use-case';
import { CreateHomestayBookingDto } from '../dto/create-homestay-booking.dto';
import { BookingException } from '../../application/exceptions/booking.exception';

@Controller('bookings/homestay')
export class HomestayBookingController {
  private readonly logger = new Logger(HomestayBookingController.name);

  constructor(
    private readonly createHomestayBookingUC: CreateHomestayBookingUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createHomestayBooking(@Body() dto: CreateHomestayBookingDto) {
    try {
      const booking = await this.createHomestayBookingUC.execute(dto);
      return {
        status: 'success',
        message: 'Homestay booking created successfully',
        data: booking,
      };
    } catch (error) {
      this.logger.error(`Failed to create homestay booking: ${error.message}`, error.stack);

      if (error instanceof BookingException) {
        throw new HttpException({
          status: 'error',
          message: error.message,
        }, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException({
        status: 'error',
        message: 'An unexpected error occurred while creating the booking',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
