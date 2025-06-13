import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateHomestayBookingUseCase } from '../../application/use-cases/create-homestay-booking.use-case';
// import { GetHomestayBookingUseCase } from '../../application/use-cases/get-homestay-booking.use-case';
// import { GetAllHomestayBookingsUseCase } from '../../application/use-cases/get-all-homestay-bookings.use-case';
// import { UpdateHomestayBookingUseCase } from '../../application/use-cases/update-homestay-booking.use-case';
// import { DeleteHomestayBookingUseCase } from '../../application/use-cases/delete-homestay-booking.use-case';

import { CreateHomestayBookingDto } from '../dto/create-homestay-booking.dto';

import { GetAllBookingsUseCase } from '../../application/use-cases/get-all-bookings.use-case';
// import { UpdateHomestayBookingDto } from '../dto/update-homestay-booking.dto';

@Controller('bookings/homestay')
export class HomestayBookingController {
  constructor(
    private readonly createUC: CreateHomestayBookingUseCase,
    private readonly getAllUC: GetAllBookingsUseCase,
    // private readonly getOneUC: GetHomestayBookingUseCase,
    // private readonly getAllUC: GetAllHomestayBookingsUseCase,
    // private readonly updateUC: UpdateHomestayBookingUseCase,
    // private readonly deleteUC: DeleteHomestayBookingUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateHomestayBookingDto) {
    const booking = await this.createUC.execute(dto);
    return {
      status: 'success',
      message: 'Homestay booking created successfully',
      data: booking,
    };
  }

  @Get()
  async findAll() {
    const bookings = await this.getAllUC.execute();
    return {
      status: 'success',
      data: bookings,
    };
  }

  // @Get()
  // async findAll() {
  //   const bookings = await this.getAllUC.execute();
  //   return {
  //     status: 'success',
  //     data: bookings,
  //   };
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const booking = await this.getOneUC.execute(id);
  //   if (!booking) throw new NotFoundException('Booking not found');
  //   return {
  //     status: 'success',
  //     data: booking,
  //   };
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() dto: UpdateHomestayBookingDto) {
  //   const updated = await this.updateUC.execute(id, dto);
  //   return {
  //     status: 'success',
  //     message: 'Booking updated successfully',
  //     data: updated,
  //   };
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async remove(@Param('id') id: string) {
  //   await this.deleteUC.execute(id);
  // }
}
