import { IsNotEmpty, IsString, IsNumber, IsEmail, IsDate, Min, IsOptional, IsEnum, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ description: 'Customer full name' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Customer email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Customer phone' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'Booking type (tour or homestay)' })
  @IsNotEmpty()
  @IsEnum(['tour', 'homestay'])
  type: 'tour' | 'homestay';

  @ApiProperty({ description: 'Tour ID (required if type is tour)' })
  @IsOptional()
  @IsString()
  tourId?: string;

  @ApiProperty({ description: 'Homestay ID (required if type is homestay)' })
  @IsOptional()
  @IsString()
  homestayId?: string;

  @ApiProperty({ description: 'Check-in date (required for homestay)' })
  @IsOptional()
  @IsDate()
  checkInDate?: Date;

  @ApiProperty({ description: 'Check-out date (required for homestay)' })
  @IsOptional()
  @IsDate()
  checkOutDate?: Date;

  @ApiProperty({ description: 'Number of guests' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfGuests: number;

  @ApiProperty({ description: 'Special requests', required: false })
  @IsOptional()
  @IsString()
  specialRequests?: string;
}
