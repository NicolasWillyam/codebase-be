import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateHomestayBookingUseCase } from '../../application/use-cases/create-homestay-booking.use-case';
import { CreateHomestayBookingDto } from '../dto/create-homestay-booking.dto';

@Controller('bookings/homestay')
export class HomestayBookingController {
  constructor(
    private readonly createHomestayBookingUC: CreateHomestayBookingUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createHomestayBooking(@Body() dto: CreateHomestayBookingDto) {
    const booking = await this.createHomestayBookingUC.execute(dto);
    return {
      status: 'success',
      message: 'Homestay booking created successfully',
      data: booking,
    };
  }
}
