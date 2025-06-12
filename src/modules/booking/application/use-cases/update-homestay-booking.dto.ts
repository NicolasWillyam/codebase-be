// update-homestay-booking.dto.ts
import {
  IsOptional,
  IsDateString,
  IsInt,
  IsString,
  Min,
} from 'class-validator';

export class UpdateHomestayBookingDto {
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
}
