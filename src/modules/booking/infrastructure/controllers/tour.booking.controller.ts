import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  Patch,
  Req,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingUseCase } from '../../application/use-cases/create-booking.use-case';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { GetBookingsUseCase } from '../../application/use-cases/get-bookings.use-case';
import { AuthRolesGuard } from '@/modules/auth/infrastructure/guards/auth-roles.guard';
import { Roles } from '@/modules/auth/infrastructure/decorators/roles.decorator';
import { UserRole } from '@/modules/auth/domain/user-role.enum';
import { GetBookingDetailUseCase } from '../../application/use-cases/get-booking-detail.use-case';
import { UpdateBookingStatusUseCase } from '../../application/use-cases/update-booking-status.use-case';
import { GetMyBookingsUseCase } from '../../application/use-cases/get-my-bookings.use-case';
import { JwtAuthGuard } from '@/modules/auth/infrastructure/guards/jwt-auth.guard';
import { UpdateBookingStatusDto } from '../dto/update-booking-status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('bookings')
export class TourBookingController {
  constructor(
    private readonly createBookingUC: CreateBookingUseCase,
    private readonly getBookingsUC: GetBookingsUseCase,
    private readonly getBookingDetailUC: GetBookingDetailUseCase,
    private readonly updateBookingStatusUC: UpdateBookingStatusUseCase,
    private readonly getMyBookingsUC: GetMyBookingsUseCase,
  ) {}

  @Get()
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return list of all bookings' })
  async getAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      const data = await this.getBookingsUC.execute({ page, limit });
      return {
        status: 'success',
        message: 'List of bookings',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get booking detail by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return booking detail' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBooking(@Param('id') id: string) {
    try {
      const data = await this.getBookingDetailUC.execute(id);
      if (!data) {
        throw new NotFoundException('Booking not found');
      }
      return {
        status: 'success',
        message: 'Booking detail',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get('/my-bookings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user bookings' })
  @ApiResponse({ status: 200, description: 'Return user bookings' })
  async getMyBookings(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: string,
  ) {
    try {
      const data = await this.getMyBookingsUC.execute(req.user.email, {
        page,
        limit,
        status,
      });
      return {
        status: 'success',
        message: 'Your bookings',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async bookTour(@Body() dto: CreateBookingDto) {
    try {
      const booking = await this.createBookingUC.execute(dto);
      return {
        status: 'success',
        message: 'Booking submitted successfully',
        data: booking,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id/status')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update booking status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Booking status updated' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateBookingStatusDto,
  ) {
    try {
      await this.updateBookingStatusUC.execute(id, body.status);
      return {
        status: 'success',
        message: 'Booking status updated',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
