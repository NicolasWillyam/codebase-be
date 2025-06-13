// import {
//   Body,
//   Controller,
//   Post,
//   HttpCode,
//   HttpStatus,
//   Get,
//   UseGuards,
//   Param,
//   Patch,
//   Req,
// } from '@nestjs/common';
// import { CreateBookingUseCase } from '../../application/use-cases/create-booking.use-case';
// import { CreateBookingDto } from '../dto/create-booking.dto';
// import { GetBookingsUseCase } from '../../application/use-cases/get-bookings.use-case';
// import { AuthRolesGuard } from '@/modules/auth/infrastructure/guards/auth-roles.guard';
// import { Roles } from '@/modules/auth/infrastructure/decorators/roles.decorator';
// import { UserRole } from '@/modules/auth/domain/user-role.enum';
// import { GetBookingDetailUseCase } from '../../application/use-cases/get-booking-detail.use-case';
// import { GetMyBookingsUseCase } from '../../application/use-cases/get-my-bookings.use-case';
// import { JwtAuthGuard } from '@/modules/auth/infrastructure/guards/jwt-auth.guard';
// import { UpdateBookingStatusDto } from '../dto/update-booking-status.dto';
// import { UpdateBookingUseCase } from '../../application/use-cases/update-booking-status.use-case';

// @Controller('bookings')
// export class TourBookingController {
//   constructor(
//     private readonly createBookingUC: CreateBookingUseCase,
//     private readonly getBookingsUC: GetBookingsUseCase,
//     private readonly getBookingDetailUC: GetBookingDetailUseCase,
//     private readonly updateBookingStatusUC: UpdateBookingUseCase,
//     private readonly getMyBookingsUC: GetMyBookingsUseCase,
//   ) {}

//   @Get()
//   @UseGuards(AuthRolesGuard)
//   @Roles(UserRole.Admin)
//   async getAll() {
//     const data = await this.getBookingsUC.execute();
//     return {
//       status: 'success',
//       message: 'List of bookings',
//       data,
//     };
//   }

//   @Get(':id')
//   @UseGuards(AuthRolesGuard)
//   @Roles(UserRole.Admin)
//   async getBooking(@Param('id') id: string) {
//     const data = await this.getBookingDetailUC.execute(id);
//     return {
//       status: 'success',
//       message: 'Booking detail',
//       data,
//     };
//   }

//   @Get('/my-bookings')
//   @UseGuards(JwtAuthGuard)
//   async getMyBookings(@Req() req) {
//     const data = await this.getMyBookingsUC.execute(req.user.email);
//     return {
//       status: 'success',
//       message: 'Your bookings',
//       data,
//     };
//   }

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   async bookTour(@Body() dto: CreateBookingDto) {
//     const booking = await this.createBookingUC.execute(dto);
//     return {
//       status: 'success',
//       message: 'Booking submitted successfully',
//       data: booking,
//     };
//   }

//   @Patch(':id/status')
//   @UseGuards(AuthRolesGuard)
//   @Roles(UserRole.Admin)
//   async updateStatus(
//     @Param('id') id: string,
//     @Body() body: UpdateBookingStatusDto,
//   ) {
//     await this.updateBookingStatusUC.execute(id, body.status);
//     return {
//       status: 'success',
//       message: 'Booking status updated',
//     };
//   }
// }
