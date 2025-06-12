// src/modules/booking/infrastructure/dto/update-booking.dto.ts

import {
  IsOptional,
  IsDateString,
  IsInt,
  IsString,
  Min,
  IsEnum,
} from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDateString()
  checkInDate?: string;

  @IsOptional()
  @IsDateString()
  checkOutDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  numberOfGuests?: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(['tour', 'homestay'])
  type?: 'tour' | 'homestay';
}
